import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { UserContextService } from 'src/auth/user-context/user-context.service';
import {
  CountCriancaExpostaHivDesfechoGeral,
  CountCriancaExpostaHivStatus,
  CountCriancaExpostaHivAlerta,
  CountCriancaExpostaHivDesfecho,
} from './dto/count-criancaexpostahiv.dto';
import { UsuariologService } from 'src/usuariolog/usuariolog.service';
import { Prisma } from '@prisma/client';
import { mapUpdateCriancaExpostaHivDtoToPrisma } from './mapper/criancaexpostahiv.mapper';
// Extendendo o dayjs com o plugin utc
//dayjs.extend(utc);

@Injectable()
export class CriancaexpostahivService {
  @Inject() private readonly prisma: PrismaService;
  @Inject() private readonly userContext: UserContextService;
  @Inject() private readonly usuariologService: UsuariologService;
  
  // ===============================
  // CREATE
  // ===============================
  async create(createCriancaexpostahivDto: any) {
    const existingRecord =
      await this.prisma.tb_monitora_criancaexposta_hiv.findFirst({
        where: {
          id_paciente: createCriancaexpostahivDto.id_paciente,
        },
      });

    if (existingRecord) {
      throw new Error('Já existe um registro com este id_paciente.');
    }

    return this.prisma.tb_monitora_criancaexposta_hiv.create({
      data: createCriancaexpostahivDto,
    });
  }

  // ===============================
  // FIND ALL
  // ===============================
  async findAll(page: number, limit: number, filters?: string) {
    const skip =
      (page > 0 ? page - 1 : 0) * (limit > 0 ? limit : 10);

    //const where: Prisma.tb_monitora_criancaexposta_hivWhereInput = {};

    const where: any = {};

    const { hierarquia, cnes } = this.userContext;

    /**
     * REGRAS DE ACESSO POR HIERARQUIA
     * SMS → vê tudo (não aplica filtro)
     * demais → filtra por CNES
     */
    if (hierarquia === 'coordenadoria_regional') {
      where.tb_coordenadoria = {
        cnes_coordenadoria: { in: cnes },
      };
    }

    if (hierarquia === 'supervisao_tecnica') {
      where.tb_supervisao = {
        cnes_supervisao: { in: cnes },
      };
    }

    if (hierarquia === 'supervisao_uvis') {
      where.tb_uvis = {
        cnes_uvis: { in: cnes },
      };
    }

    if (hierarquia === 'UBS') {
      where.tb_unidade_monitoramento = {
        cnes_unidade: { in: cnes },
      };
    }

    // ===============================
    // FILTROS DINÂMICOS
    // ===============================
    if (filters) {
      const parsedFilters = JSON.parse(filters);

      if (
        parsedFilters.tb_unidade_monitoramento?.id_coordenadoria
      ) {
        where.tb_unidade_monitoramento = {
          ...where.tb_unidade_monitoramento,
          id_coordenadoria:
            parsedFilters.tb_unidade_monitoramento.id_coordenadoria,
        };
      }

      if (parsedFilters.id_paciente) {
        where.id_paciente = parsedFilters.id_paciente;
      }

      if (parsedFilters.id_desfecho_criexp_hiv) {
        where.id_desfecho_criexp_hiv =
          parsedFilters.id_desfecho_criexp_hiv;
      }

      if (parsedFilters.id_alerta_criancaexposta_hiv) {
        where.tb_alerta_criancaexposta_hiv_monitoramento = {
          some: {
            id_alerta_criancaexposta_hiv:
              parsedFilters.id_alerta_criancaexposta_hiv,
          },
        };
      }
    }

    const total =
      await this.prisma.tb_monitora_criancaexposta_hiv.count({
        where,
      });

    const records =
      await this.prisma.tb_monitora_criancaexposta_hiv.findMany({
        skip,
        take: Number(limit),
        where,
        include: {
          tb_paciente: {
            select: {
              cns_paciente: true,
              cns_mae: true,
              dt_nascimento: true,
              flg_crianca: true,
              flg_gestante: true,
              no_paciente: true,
            },
          },
          tb_desfecho_criancaexposta_hiv: {
            select: {
              no_desfecho_criancaexposta_hiv: true,
            },
          },
          tb_unidade_monitoramento: {
            select: {
              cnes_unidade: true,
              no_unidade: true,
              id_supervisao: true,
              id_uvis: true,
              is_sae: true,
              tb_coordenadoria: {
                select: { no_coordenadoria: true },
              },
              tb_supervisao: {
                select: { no_supervisao: true },
              },
              tb_uvis: {
                select: { no_uvis: true },
              },
            },
          },
        },
      });

    return {
      total,
      records,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  // Método para encontrar um registro específico por id
  async findOne(id: number) {
    try {
      const record = await this.prisma.tb_monitora_criancaexposta_hiv.findUnique({
        where: { id },
        include: {
          tb_paciente: {
            select: {
              cns_paciente: true,
              cns_mae: true,
              dt_nascimento: true,
              flg_crianca: true,
              flg_gestante: true,
              no_paciente: true,
            }
          },
          tb_desfecho_criancaexposta_hiv: {
            select: {
              no_desfecho_criancaexposta_hiv: true,
            },
          },
          tb_alerta_criancaexposta_hiv_monitoramento: {
            select: {
              id_alerta_criancaexposta_hiv: true,
              tb_alerta_criancaexposta_hiv: {
                select: {
                    id: true,
                    ds_alerta_reduzido_criancaexposta_hiv: true 
                }
              }
            }
          },
          tb_unidade_monitoramento: {
            select: {
              cnes_unidade: true,
              no_unidade: true,
              id_coordenadoria: true,
              id_supervisao: true,
              id_uvis: true,
              is_sae: true,
              tb_coordenadoria: { select: { no_coordenadoria: true } },
              tb_supervisao: { select: { no_supervisao: true } },
              tb_uvis: { select: { no_uvis: true } },
            },
          },
          tb_periodo_arv_nascimento: {
            select:{
              no_periodo_arv_nascimento:true,
            }  
          },
          tb_origem_monitoramento: {
            select:{
              no_origem_cadastro:true,
            }  
          },
          tb_origem_desfecho: {
            select:{
              no_origem_cadastro:true,
            }  
          },
          tb_maternidade: {
            select: {
              cnes_unidade:true,
              no_unidade: true,
            },
          },
          tb_unidade_notific_sinan: {
            select: {
              cnes_unidade:true,
              no_unidade: true,
            },
          },
          tb_exame_hiv_elisa_ib_apos_12: {
            select: {
              dt_cadastro_resultado:true,
              tb_tipo_resultado_elisa: 
              {
                select: {ds_resultado_elisa:true}
              },
              tb_tipo_resultado_hivib: 
              {
                select: {ds_resultado_hivib:true}
              }
            },
          },
          tb_exame_hiv_elisa_ib_apos_18: {
            select: {
              dt_cadastro_resultado:true,
              tb_tipo_resultado_elisa: 
              {
                select: {ds_resultado_elisa:true}
              },
              tb_tipo_resultado_hivib: 
              {
                select: {ds_resultado_hivib:true}
              }
            },
          },
          tb_exame_hiv_elisa_ib_first: {
            select: {
              dt_cadastro_resultado:true,
              tb_tipo_resultado_elisa: 
              {
                select: {ds_resultado_elisa:true}
              },
              tb_tipo_resultado_hivib: 
              {
                select: {ds_resultado_hivib:true}
              }
            },
          },
          tb_exame_hiv_elisa_ib_diagnostico: {
            select: {
              dt_cadastro_resultado:true,
              tb_tipo_resultado_elisa: 
              {
                select: {ds_resultado_elisa:true}
              },
              tb_tipo_resultado_hivib: 
              {
                select: {ds_resultado_hivib:true}
              }
            },
          },
          tb_carga_viral_primeira: {
            select: {
              dt_recebimento: true,
              copias: true,
              tb_tipo_resultado_carga_viral: 
              {
                select: {no_tipo_resultado_carga_viral: true}
              },
            },
          },
          tb_carga_viral_penultima: {
            select: {
              dt_recebimento: true,
              copias: true,
              tb_tipo_resultado_carga_viral: 
              {
                select: {no_tipo_resultado_carga_viral: true}
              },
            },
          },
          tb_carga_viral_ultima: {
            select: {
              dt_recebimento: true,
              copias: true,
              tb_tipo_resultado_carga_viral: 
              {
                select: {no_tipo_resultado_carga_viral: true}
              },
            },
          },
        }
  
      });

      if (!record) {
        throw new Error(`Registro com id ${id} não encontrado.`);
      }

      return record;
    } catch (error) {
      throw new Error('Erro ao buscar registro: ' + error.message);
    }
  }


async update(id: number, updateCriancaexpostahivDto: any) {
  try {
    /**
     * Tratamento da data de desfecho
     */
    if (updateCriancaexpostahivDto.dt_desfecho_criexp_hiv === null) {
      updateCriancaexpostahivDto.dt_desfecho_criexp_hiv = null;
    } else if (updateCriancaexpostahivDto.dt_desfecho_criexp_hiv) {
      const data = new Date(updateCriancaexpostahivDto.dt_desfecho_criexp_hiv);
      data.setMinutes(data.getMinutes() + data.getTimezoneOffset());
      updateCriancaexpostahivDto.dt_desfecho_criexp_hiv = data;
    }

    /**
     * Atualiza vínculo mãe → paciente
     */
    if (
      updateCriancaexpostahivDto.id_paciente_mae !== null &&
      updateCriancaexpostahivDto.id_paciente !== null
    ) {
      await this.prisma.tb_paciente.update({
        where: {
          id: Number(updateCriancaexpostahivDto.id_paciente),
        },
        data: {
          id_paciente_mae: updateCriancaexpostahivDto.id_paciente_mae,
        },
      });
    }

    /**
     * 🔥 AQUI entra o mapper
     */
    const prismaData =
      mapUpdateCriancaExpostaHivDtoToPrisma(updateCriancaexpostahivDto);

    /**
     * Update principal
     */
    const updatedRecord =
      await this.prisma.tb_monitora_criancaexposta_hiv.update({
        where: { id },
        data: prismaData,
      });

    /**
     * Log de auditoria
     */
    await this.usuariologService.logAction(
      this.userContext.userId ?? 'system',
      this.userContext.username ?? 'system',
      'UPDATE',
      'tb_monitora_criancaexposta_hiv',
      id,
      `Atualizado registro de criança exposta HIV com ID: ${id}`,
    );

    return updatedRecord;
  } catch (error) {
    throw new Error('Erro ao atualizar registro: ' + error.message);
  }
}

/*
  async update(id: number, updateCriancaexpostahivDto: any, userKeycloak: any) {
    try {
      // Verifique se a data é nula e defina corretamente.
      if (updateCriancaexpostahivDto.dt_desfecho_criexp_hiv === null) {
        updateCriancaexpostahivDto.dt_desfecho_criexp_hiv = null;
      } else if (updateCriancaexpostahivDto.dt_desfecho_criexp_hiv) {
        // Caso contrário, se houver um valor, converta para uma data válida.
        updateCriancaexpostahivDto.dt_desfecho_criexp_hiv = new Date(updateCriancaexpostahivDto.dt_desfecho_criexp_hiv);
        updateCriancaexpostahivDto.dt_desfecho_criexp_hiv.setMinutes(
          updateCriancaexpostahivDto.dt_desfecho_criexp_hiv.getMinutes() +
          updateCriancaexpostahivDto.dt_desfecho_criexp_hiv.getTimezoneOffset()
        );
      }
  
      if (updateCriancaexpostahivDto.id_paciente_mae !== null && updateCriancaexpostahivDto.id_paciente !== null) {
          await this.prisma.tb_paciente.update({
            where: { id: Number(updateCriancaexpostahivDto.id_paciente) },
            data: {
              id_paciente_mae:  updateCriancaexpostahivDto.id_paciente_mae
            }
          });
        };
      

      // Atualizar o registro no banco de dados
      const updatedRecord = await this.prisma.tb_monitora_criancaexposta_hiv.update({
        where: { id },
        data: updateCriancaexpostahivDto
      });
  
      // Registrar o log de ação
      await this.usuariologService.logAction(
        userKeycloak.sub,
        userKeycloak.preferred_username,
        'Update',
        'tb_monitora_criancaexposta_hiv',
        id,
        `Atualizado registro de criança exposta HIV com ID: ${id}`
      );
  
      return updatedRecord;
    } catch (error) {
      throw new Error('Erro ao atualizar registro: ' + error.message);
    }
  }
*/
  
  // Método para remover um registro
  async remove(id: number) {
    try {
      const deletedRecord = await this.prisma.tb_monitora_criancaexposta_hiv.delete({
        where: { id },
      });

      return deletedRecord;
    } catch (error) {
      throw new Error('Erro ao remover registro: ' + error.message);
    }
  }


  async countCriancaExpostaHivDesfechoGeral(): Promise<CountCriancaExpostaHivDesfechoGeral[]> {
    console.log(this.userContext.hierarquia);
    console.log(this.userContext.cnes);
  
    let filter_unidade_monitoramento = ''; // Defina a variável como uma string vazia inicialmente

    const { hierarquia, cnes } = this.userContext;
    // Construção do filtro com base no tipo de hierarquia_acesso
    if (hierarquia === 'coordenadoria_regional') {
      filter_unidade_monitoramento = `AND coo.cnes_coordenadoria = ${cnes}::text`;
    }
  
    if (hierarquia === 'supervisao_tecnica') {
      filter_unidade_monitoramento = `AND sts.cnes_supervisao = ${cnes}::text`;
    }
  
    if (hierarquia === 'supervisao_uvis') {
      filter_unidade_monitoramento = `AND uvi.cnes_uvis = ${cnes}::text`;
    }
  
    try {
      const result: CountCriancaExpostaHivDesfecho[] = 
        await this.prisma.$queryRaw`

          SELECT  	tmch.id_desfecho_criexp_hiv,
                    tdch.no_desfecho_criancaexposta_hiv,	
                    COUNT(tmch.id) AS qt_monitoramento	
          from	    app.tb_monitora_criancaexposta_hiv 	tmch
          join 		  app.tb_desfecho_criancaexposta_hiv 	tdch  on tdch.id = tmch.id_desfecho_criexp_hiv
          left join	app.tb_unidade_saude uni on uni.id = tmch.id_unidade_monitoramento
          left join app.tb_coordenadoria coo on coo.id = uni.id_coordenadoria 
          left join app.tb_supervisao sts on sts.id = uni.id_supervisao  
          left join app.tb_uvis uvi on uvi.id = uni.id_uvis  
          WHERE 
          1=1 
          ${Prisma.sql([filter_unidade_monitoramento])} 
            GROUP BY 1, 2
            ORDER BY 1, 2;`;

      // Processar os resultados e converter qualquer BigInt para Number ou String
      const processedResults = result.map(item => {
        return {
          id_desfecho_criexp_hiv: item.id_desfecho_criexp_hiv,
          no_desfecho_criancaexposta_hiv: item.no_desfecho_criancaexposta_hiv,
          qt_monitoramento: Number(item.qt_monitoramento), // Converter BigInt para Number
        };
      });
  
      return processedResults;
    } catch (error) {
      throw new Error('Erro ao contar crianças expostas por alerta: ' + error.message);
    }
  }



  async countCriancaExpostaHivStatus(): Promise<CountCriancaExpostaHivStatus[]> {

    const { hierarquia, cnes } = this.userContext;

    console.log('countCriancaExpostaHivStatus');
    console.log(hierarquia);
    console.log(cnes);
  
    let filter_unidade_monitoramento = ''; // Defina a variável como uma string vazia inicialmente
  
    // Construção do filtro com base no tipo de hierarquia_acesso
    if (hierarquia === 'coordenadoria_regional') {
      filter_unidade_monitoramento = `AND coo.cnes_coordenadoria = ${cnes}::text`;
    }
  
    if (hierarquia === 'supervisao_tecnica') {
      filter_unidade_monitoramento = `AND sts.cnes_supervisao = ${cnes}::text`;
    }
  
    if (hierarquia === 'supervisao_uvis') {
      filter_unidade_monitoramento = `AND uvi.cnes_uvis = ${cnes}::text`;
    }
  
    try {
      const result: CountCriancaExpostaHivStatus[] = 
        await this.prisma.$queryRaw`
          SELECT  DATE_PART('year', tmch.dt_inicio_monitoramento)::TEXT AS ano_inicio_monitoramento,
                  CASE WHEN tmch.id_desfecho_criexp_hiv IS NULL OR tmch.id_desfecho_criexp_hiv = -1 THEN 'Sem Desfecho' ELSE 'Com Desfecho' 
                  END AS no_desfecho_criancaexposta_hiv,  
                  COUNT(tmch.id) AS qt_monitoramento	
          from	  app.tb_monitora_criancaexposta_hiv 	tmch
          left join	app.tb_unidade_saude uni on uni.id = tmch.id_unidade_monitoramento
          left join app.tb_coordenadoria coo on coo.id = uni.id_coordenadoria 
          left join app.tb_supervisao sts on sts.id = uni.id_supervisao  
          left join app.tb_uvis uvi on uvi.id = uni.id_uvis  
          WHERE 
          1=1 
          ${Prisma.sql([filter_unidade_monitoramento])} 
            GROUP BY 1, 2
            ORDER BY 1, 2;`;
  
      // Processar os resultados e converter qualquer BigInt para Number ou String
      const processedResults = result.map(item => {
        return {
          ano_inicio_monitoramento: item.ano_inicio_monitoramento,
          no_desfecho_criancaexposta_hiv: item.no_desfecho_criancaexposta_hiv,
          qt_monitoramento: Number(item.qt_monitoramento), // Converter BigInt para Number
        };
      });
  
      return processedResults;
    } catch (error) {
      throw new Error('Erro ao contar crianças expostas por desfecho: ' + error.message);
    }
  }



  async countCriancaExpostaHivAlerta(): Promise<CountCriancaExpostaHivAlerta[]> {

    const { hierarquia, cnes } = this.userContext;


    console.log('CountCriancaExpostaHivAlerta');
    console.log(hierarquia);
    console.log(cnes);
  
    let filter_unidade_monitoramento = ''; // Defina a variável como uma string vazia inicialmente
  
    // Construção do filtro com base no tipo de hierarquia_acesso
    if (hierarquia === 'coordenadoria_regional') {
      filter_unidade_monitoramento = `AND coo.cnes_coordenadoria = ${cnes}::text`;
    }
  
    if (hierarquia === 'supervisao_tecnica') {
      filter_unidade_monitoramento = `AND sts.cnes_supervisao = ${cnes}::text`;
    }
  
    if (hierarquia === 'supervisao_uvis') {
      filter_unidade_monitoramento = `AND uvi.cnes_uvis = ${cnes}::text`;
    }
  
    try {
      const result: CountCriancaExpostaHivAlerta[] = 
        await this.prisma.$queryRaw`
          select 	ale.id as id_alerta_criancaexposta_hiv,
                  ale.ds_alerta_reduzido_criancaexposta_hiv as no_alerta,
                  count(ale_mce.id_monitora_criancaexposta_hiv) as qt_monitoramento	
          from      app.tb_alerta_criancaexposta_hiv                ale     
          left join app.tb_alerta_criancaexposta_hiv_monitoramento 	ale_mce on ale.id = ale_mce.id_alerta_criancaexposta_hiv
          left join app.tb_monitora_criancaexposta_hiv 	            tmch    on tmch.id = ale_mce.id_monitora_criancaexposta_hiv  
          left join	app.tb_unidade_saude uni on uni.id = tmch.id_unidade_monitoramento
          left join app.tb_coordenadoria coo on coo.id = uni.id_coordenadoria 
          left join app.tb_supervisao sts on sts.id = uni.id_supervisao  
          left join app.tb_uvis uvi on uvi.id = uni.id_uvis  
          where 	(tmch.id_desfecho_criexp_hiv IS NULL OR tmch.id_desfecho_criexp_hiv = -1)
          ${Prisma.sql([filter_unidade_monitoramento])} 
            GROUP BY 1,2
            ORDER BY 1,2;`;
      // Processar os resultados e converter qualquer BigInt para Number ou String
      const processedResults = result.map(item => {
        return {
          id_alerta_criancaexposta_hiv: item.id_alerta_criancaexposta_hiv,
          no_alerta: item.no_alerta,
          qt_monitoramento: Number(item.qt_monitoramento), // Converter BigInt para Number
        };
      });
  
      return processedResults;
    } catch (error) {
      throw new Error('Erro ao contar crianças expostas por alerta: ' + error.message);
    }
  }




  async countCriancaExpostaHivDesfecho(): Promise<CountCriancaExpostaHivDesfecho[]> {


    const { hierarquia, cnes } = this.userContext;


    console.log(hierarquia);
    console.log(cnes);
  
    let filter_unidade_monitoramento = ''; // Defina a variável como uma string vazia inicialmente
  
    // Construção do filtro com base no tipo de hierarquia_acesso
    if (hierarquia === 'coordenadoria_regional') {
      filter_unidade_monitoramento = `AND coo.cnes_coordenadoria = ${cnes}::text`;
    }
  
    if (hierarquia === 'supervisao_tecnica') {
      filter_unidade_monitoramento = `AND sts.cnes_supervisao = ${cnes}::text`;
    }
  
    if (hierarquia === 'supervisao_uvis') {
      filter_unidade_monitoramento = `AND uvi.cnes_uvis = ${cnes}::text`;
    }
  
    try {
      const result: CountCriancaExpostaHivDesfecho[] = 
        await this.prisma.$queryRaw`

          SELECT  	DATE_PART('year', tmch.dt_inicio_monitoramento)::TEXT AS ano_inicio_monitoramento,
                    tmch.id_desfecho_criexp_hiv,
                    tdch.no_desfecho_criancaexposta_hiv,	
                    COUNT(tmch.id) AS qt_monitoramento	
          from	    app.tb_monitora_criancaexposta_hiv 	tmch
          join 		  app.tb_desfecho_criancaexposta_hiv 	tdch  on tdch.id = tmch.id_desfecho_criexp_hiv
          left join	app.tb_unidade_saude uni on uni.id = tmch.id_unidade_monitoramento
          left join app.tb_coordenadoria coo on coo.id = uni.id_coordenadoria 
          left join app.tb_supervisao sts on sts.id = uni.id_supervisao  
          left join app.tb_uvis uvi on uvi.id = uni.id_uvis  
          WHERE 
          1=1 
          ${Prisma.sql([filter_unidade_monitoramento])} 
            GROUP BY 1, 2, 3
            ORDER BY 1, 2, 3;`;

      // Processar os resultados e converter qualquer BigInt para Number ou String
      const processedResults = result.map(item => {
        return {
          ano_inicio_monitoramento: item.ano_inicio_monitoramento,
          id_desfecho_criexp_hiv: item.id_desfecho_criexp_hiv,
          no_desfecho_criancaexposta_hiv: item.no_desfecho_criancaexposta_hiv,
          qt_monitoramento: Number(item.qt_monitoramento), // Converter BigInt para Number
        };
      });
  
      return processedResults;
    } catch (error) {
      throw new Error('Erro ao contar crianças expostas por alerta: ' + error.message);
    }
  }
}


import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service'; // Prisma para interação com o banco
import { TenantService } from 'src/tenant/tenant/tenant.service'; // Serviço de Tenant (acesso controlado)
import { CountCriancaExpostaHivDesfechoGeral, CountCriancaExpostaHivStatus, CountCriancaExpostaHivAlerta, CountCriancaExpostaHivDesfecho } from './dto/count-criancaexpostahiv.dto';
import { UsuariologService } from 'src/usuariolog/usuariolog.service'; // Importando o serviço de logs
import { Prisma } from '@prisma/client';

@Injectable()
export class CriancaexpostahivService {
  @Inject() private readonly prisma: PrismaService;
  @Inject() private readonly tenantService: TenantService;
  @Inject() private readonly usuariologService: UsuariologService; // Injetando o serviço de logs

  // Método para criar um novo registro
  async create(createCriancaexpostahivDto: any) {
    const existingRecord = await this.prisma.tb_monitora_criancaexposta_hiv.findFirst({
      where: {
        id_paciente: createCriancaexpostahivDto.id_paciente, // Exemplo de validação para paciente
      },
    });

    if (existingRecord) {
      throw new Error('Já existe um registro com este id_paciente.');
    }

    const newRecord = await this.prisma.tb_monitora_criancaexposta_hiv.create({
      data: createCriancaexpostahivDto,
    });

    return newRecord;
  }

  // Método para obter todos os registros
  async findAll() {
    console.log('findall crianca exposta');
    console.log(this.tenantService.hierarquia_acesso);
    console.log(this.tenantService.cnes_vinculo);
    //const hierarquia_acesso = this.tenantService.hierarquia_acesso;
    //const cnes_vinculo = this.tenantService.cnes_vinculo;

    let filter_unidade_monitoramento = {}; // Defina a variável como um objeto vazio inicialmente

    // Construção do filtro com base no tipo de hierarquia_acesso
    if (this.tenantService.hierarquia_acesso === 'coordenadoria_regional') {
      filter_unidade_monitoramento = {
        tb_coordenadoria: {
          cnes_coordenadoria: this.tenantService.cnes_vinculo,
        },
      };
    }

    if (this.tenantService.hierarquia_acesso === 'supervisao_tecnica') {
      filter_unidade_monitoramento = {
        tb_supervisao: {
          cnes_supervisao: this.tenantService.cnes_vinculo,
        },
      };
    }

    if (this.tenantService.hierarquia_acesso === 'supervisao_uvis') {
      filter_unidade_monitoramento = {
        tb_uvis: {
          cnes_uvis: this.tenantService.cnes_vinculo,
        },
      };
    }

    try {
      const records = await this.prisma.tb_monitora_criancaexposta_hiv.findMany({
        where: {
          tb_unidade_monitoramento: filter_unidade_monitoramento, // Usando o objeto de filtro
        },
        include: {
          tb_maternidade: {
            select: {
              cnes_unidade:true,
              no_unidade: true,
            },
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
              tb_supervisao_to_unidade_saude: { select: { no_supervisao: true } },
              tb_uvis: { select: { no_uvis: true } },
            },
          },
          tb_paciente: {
            select: {
              no_paciente: true,
            },
          },
          tb_desfecho_criancaexposta_hiv: {
            select: {
              no_desfecho_criancaexposta_hiv: true,
            },
          },
          tb_alerta_criancaexposta_hiv_monitoramento: {
            select: {
              tb_alerta_criancaexposta_hiv: {
                select: {
                    id: true,
                    ds_alerta_reduzido_criancaexposta_hiv: true 
                }
              }
            }
          }
        },
      });

      return records || []; // Retorna um array vazio caso não haja registros
    } catch (error) {
      throw new Error('Erro ao buscar registros: ' + error.message);
    }
  }

  // Método para encontrar um registro específico por id
  async findOne(id: number) {
    try {
      const record = await this.prisma.tb_monitora_criancaexposta_hiv.findUnique({
        where: { id },
      });

      if (!record) {
        throw new Error(`Registro com id ${id} não encontrado.`);
      }

      return record;
    } catch (error) {
      throw new Error('Erro ao buscar registro: ' + error.message);
    }
  }

  // Método para atualizar um registro
  async update(id: number, updateCriancaexpostahivDto: any, userKeycloak: any) {
    try {
      const updatedRecord = await this.prisma.tb_monitora_criancaexposta_hiv.update({
        where: { id },
        data: updateCriancaexpostahivDto,
      });

    // Registrar o log
      await this.usuariologService.logAction(userKeycloak.sub, userKeycloak.preferred_username, 'Update', 'tb_monitora_criancaexposta_hiv', id, `Atualizado registro de criança exposta HIV com ID: ${id}`);
      return updatedRecord;
    } catch (error) {
      throw new Error('Erro ao atualizar registro: ' + error.message);
    }
  }

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





// Método para contar crianças expostas por desfecho
async countCriancaExpostaHivDesfechoGeral(): Promise<CountCriancaExpostaHivDesfechoGeral[]> {
  console.log('countCriancaExpostaHivDesfecho');
  console.log(this.tenantService.hierarquia_acesso);
  console.log(this.tenantService.cnes_vinculo);

  let filter_unidade_monitoramento = {}; // Defina a variável como um objeto vazio inicialmente

  // Construção do filtro com base no tipo de hierarquia_acesso
  if (this.tenantService.hierarquia_acesso === 'coordenadoria_regional') {
    filter_unidade_monitoramento = {
      tb_coordenadoria: {
        cnes_coordenadoria: this.tenantService.cnes_vinculo,
      },
    };
  }

  if (this.tenantService.hierarquia_acesso === 'supervisao_tecnica') {
    filter_unidade_monitoramento = {
      tb_supervisao: {
        cnes_supervisao: this.tenantService.cnes_vinculo,
      },
    };
  }

  if (this.tenantService.hierarquia_acesso === 'supervisao_uvis') {
    filter_unidade_monitoramento = {
      tb_uvis: {
        cnes_uvis: this.tenantService.cnes_vinculo,
      },
    };
  }

  try {
    // Passo 1: Agrupar os registros por id_desfecho_criexp_hiv e dt_inicio_monitoramento
    const result = await this.prisma.tb_monitora_criancaexposta_hiv.groupBy({
      where: {
        tb_unidade_monitoramento: filter_unidade_monitoramento, // Filtro da unidade de monitoramento
      },
      by: ['id_desfecho_criexp_hiv', 'dt_inicio_monitoramento'], // Agrupar pelo ID do desfecho e pela data de início
      _count: {
        id_desfecho_criexp_hiv: true, // Contar os registros para cada desfecho
      },
    });

    // Passo 2: Buscar os nomes dos desfechos usando os IDs
    const desfechos = await this.prisma.tb_desfecho_criancaexposta_hiv.findMany({
      where: {
        id: {
          in: result.map(item => item.id_desfecho_criexp_hiv), // Buscar todos os desfechos que aparecem no resultado
        },
      },
      select: {
        id: true, // Garantir que estamos pegando os IDs
        no_desfecho_criancaexposta_hiv: true, // Buscar o nome do desfecho
      },
    });

    // Passo 3: Agrupar os resultados por ano e desfecho
    const groupedByYearAndDesfecho = result.reduce((acc, item) => {
      // Extrair o ano de `dt_inicio_monitoramento`
      const year = new Date(item.dt_inicio_monitoramento).getFullYear();
      
      // Encontrar o nome do desfecho correspondente
      const desfecho = desfechos.find(d => d.id === item.id_desfecho_criexp_hiv);
      if (!desfecho) return acc; // Se o desfecho não for encontrado, pular este item

      // Criar uma chave composta de ano e nome do desfecho
      const key = `${year}_${desfecho.no_desfecho_criancaexposta_hiv}`;

      // Se a chave ainda não existir, inicializar o contador
      if (!acc[key]) {
        acc[key] = {
          ano_desfecho: year,
          no_desfecho_criancaexposta_hiv: desfecho.no_desfecho_criancaexposta_hiv,
          total: 0,
        };
      }

      // Adicionar o total de registros para esse agrupamento
      acc[key].total += item._count.id_desfecho_criexp_hiv;

      return acc;
    }, {});

    // Passo 4: Converter o objeto agrupado em um array
    const countResult: CountCriancaExpostaHivDesfechoGeral[] = Object.values(groupedByYearAndDesfecho);

    return countResult;
  } catch (error) {
    throw new Error('Erro ao contar crianças expostas por desfecho: ' + error.message);
  }
}


  async countCriancaExpostaHivStatus(): Promise<CountCriancaExpostaHivStatus[]> {
    console.log('countCriancaExpostaHivStatus');
    console.log(this.tenantService.hierarquia_acesso);
    console.log(this.tenantService.cnes_vinculo);
  
    let filter_unidade_monitoramento = ''; // Defina a variável como uma string vazia inicialmente
  
    // Construção do filtro com base no tipo de hierarquia_acesso
    if (this.tenantService.hierarquia_acesso === 'coordenadoria_regional') {
      filter_unidade_monitoramento = `AND coo.cnes_coordenadoria = ${this.tenantService.cnes_vinculo}::text`;
    }
  
    if (this.tenantService.hierarquia_acesso === 'supervisao_tecnica') {
      filter_unidade_monitoramento = `AND sts.cnes_supervisao = ${this.tenantService.cnes_vinculo}::text`;
    }
  
    if (this.tenantService.hierarquia_acesso === 'supervisao_uvis') {
      filter_unidade_monitoramento = `AND uvi.cnes_uvis = ${this.tenantService.cnes_vinculo}::text`;
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
    console.log('CountCriancaExpostaHivAlerta');
    console.log(this.tenantService.hierarquia_acesso);
    console.log(this.tenantService.cnes_vinculo);
  
    let filter_unidade_monitoramento = ''; // Defina a variável como uma string vazia inicialmente
  
    // Construção do filtro com base no tipo de hierarquia_acesso
    if (this.tenantService.hierarquia_acesso === 'coordenadoria_regional') {
      filter_unidade_monitoramento = `AND coo.cnes_coordenadoria = ${this.tenantService.cnes_vinculo}::text`;
    }
  
    if (this.tenantService.hierarquia_acesso === 'supervisao_tecnica') {
      filter_unidade_monitoramento = `AND sts.cnes_supervisao = ${this.tenantService.cnes_vinculo}::text`;
    }
  
    if (this.tenantService.hierarquia_acesso === 'supervisao_uvis') {
      filter_unidade_monitoramento = `AND uvi.cnes_uvis = ${this.tenantService.cnes_vinculo}::text`;
    }
  
    try {
      const result: CountCriancaExpostaHivAlerta[] = 
        await this.prisma.$queryRaw`
          select 	ale.id as id_alerta,
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
    console.log(this.tenantService.hierarquia_acesso);
    console.log(this.tenantService.cnes_vinculo);
  
    let filter_unidade_monitoramento = ''; // Defina a variável como uma string vazia inicialmente
  
    // Construção do filtro com base no tipo de hierarquia_acesso
    if (this.tenantService.hierarquia_acesso === 'coordenadoria_regional') {
      filter_unidade_monitoramento = `AND coo.cnes_coordenadoria = ${this.tenantService.cnes_vinculo}::text`;
    }
  
    if (this.tenantService.hierarquia_acesso === 'supervisao_tecnica') {
      filter_unidade_monitoramento = `AND sts.cnes_supervisao = ${this.tenantService.cnes_vinculo}::text`;
    }
  
    if (this.tenantService.hierarquia_acesso === 'supervisao_uvis') {
      filter_unidade_monitoramento = `AND uvi.cnes_uvis = ${this.tenantService.cnes_vinculo}::text`;
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


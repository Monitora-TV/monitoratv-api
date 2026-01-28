import { Inject, Injectable } from '@nestjs/common';
import { CreateTbexamehivelisaibDto } from './dto/create-tbexamehivelisaib.dto';
import { UpdateTbexamehivelisaibDto } from './dto/update-tbexamehivelisaib.dto';
import { PrismaService } from 'src/database/prisma.service';
import { TenantService } from 'src/tenant/tenant.service';
import { UsuariologService } from 'src/usuariolog/usuariolog.service';

@Injectable()
export class TbexamehivelisaibService {
  @Inject()  private readonly prisma: PrismaService;
  @Inject()  private readonly tenantService: TenantService;
  @Inject()  private readonly usuariologService: UsuariologService;

  async update(id: number, updateTbexamehivelisaibDto: UpdateTbexamehivelisaibDto, userKeycloak: any) {

      updateTbexamehivelisaibDto.dt_cadastro_resultado = new Date(updateTbexamehivelisaibDto.dt_cadastro_resultado||'');
      updateTbexamehivelisaibDto.dt_cadastro_resultado.setMinutes(
        updateTbexamehivelisaibDto.dt_cadastro_resultado.getMinutes() + updateTbexamehivelisaibDto.dt_cadastro_resultado.getTimezoneOffset()
      );

    const updatedRecord = await this.prisma.tb_exame_hiv_elisa_ib.update({
      where: { id },
      data: updateTbexamehivelisaibDto,
    });

    await this.usuariologService.logAction(
      userKeycloak.sub,
      userKeycloak.preferred_username,
      'Update',
      'tb_exame_hiv_elisa_ib',
      updatedRecord.id,
      'Atualizado registro tb_exame_hiv_elisa_ib com ID:' + updatedRecord.id||''
    );

    return updatedRecord;

  }



  async create(createTbexamehivelisaibDto: CreateTbexamehivelisaibDto, userKeycloak: any) {
      createTbexamehivelisaibDto.dt_cadastro_resultado = new Date(createTbexamehivelisaibDto.dt_cadastro_resultado||'');
      createTbexamehivelisaibDto.dt_cadastro_resultado.setMinutes(
        createTbexamehivelisaibDto.dt_cadastro_resultado.getMinutes() + createTbexamehivelisaibDto.dt_cadastro_resultado.getTimezoneOffset()
      );

      const existingRecord = await this.prisma.tb_exame_hiv_elisa_ib.findFirst({
        where: {
          AND: [
            { id_paciente: createTbexamehivelisaibDto.id_paciente },
            { dt_cadastro_resultado: createTbexamehivelisaibDto.dt_cadastro_resultado },
            { id_unidade_solicitante: createTbexamehivelisaibDto.id_unidade_solicitante },
            { id_laboratorio: createTbexamehivelisaibDto.id_laboratorio },
          ],
        },
      });
      
      if (existingRecord) {
        throw new Error('Já existe um registro nesta data para este paciente.');
      }

      const newRecord = await this.prisma.tb_exame_hiv_elisa_ib.create({
      	data: createTbexamehivelisaibDto,
      });

      await this.usuariologService.logAction(
      	userKeycloak.sub,
      	userKeycloak.preferred_username,
      	'Create',
      	'tb_exame_hiv_elisa_ib',
      	newRecord.id,
      	'Criando registro tb_exame_hiv_elisa_ib com ID:'+ newRecord.id||''
    	  );

    return newRecord;
  }



  async findAll(page: number, limit: number, filters?: string) {
    // Garantir que o skip é um número válido
    const skip = (page > 0 ? page - 1 : 0) * (limit > 0 ? limit : 10); // Se 'page' ou 'limit' não forem válidos, use valores padrão
    //const skip = (page - 1) * limit;

    // Defina um objeto onde todos os filtros serão aplicados dinamicamente
    const where: any = {};
  
    if (filters) {
      try {
        // Caso o filtro seja passado como string, tenta-se fazer o parse para um objeto
        const parsedFilters = JSON.parse(filters);

        console.log(parsedFilters);

        if (parsedFilters.id_paciente) {
          where.id_paciente = parsedFilters.id_paciente
        }

        if (parsedFilters.id_tipo_resultado_elisa) {
          where.id_tipo_resultado_elisa = parsedFilters.id_tipo_resultado_elisa
        }

        if (parsedFilters.id_tipo_resultado_hivib) {
          where.id_tipo_resultado_hivib = parsedFilters.id_tipo_resultado_hivib
        }

        if (parsedFilters.id_unidade_solicitante) {
          where.id_unidade_solicitante = parsedFilters.id_unidade_solicitante
        }

        if (parsedFilters.id_laboratorio) {
          where.id_laboratorio = parsedFilters.id_laboratorio
        }


        if (parsedFilters.tb_paciente) {
          where.tb_paciente = {
            ...parsedFilters.tb_paciente,
          };
        }

        // Filtrar dinamicamente com base nos campos do filtro
        /*
        if (parsedFilters.tb_paciente) {
          where.tb_paciente = {
            ...parsedFilters.tb_paciente,
            // Adiciona o filtro para procurar no_paciente que contenha a string fornecida
            ...(parsedFilters.tb_paciente.no_paciente && {
              no_paciente: {
                contains: parsedFilters.tb_paciente.no_paciente, // Busca parcial
                mode: 'insensitive', // Torna a busca insensível a maiúsculas/minúsculas
              },
            }),
            
          };
        }
        */


  
      } catch (error) {
        throw new Error('Invalid filter format');
      }
    }
  
    // Verifique se 'limit' e 'page' são valores válidos
    const total = await this.prisma.tb_exame_hiv_elisa_ib.count({
      where, // Aplica o filtro dinamicamente
    });
  
    // Consulta com valores válidos de skip e take
    const records = await this.prisma.tb_exame_hiv_elisa_ib.findMany({
      skip,
      take: Number(limit), // 'take' deve ser um número válido (limit)
      where, // Aplica o filtro dinamicamente
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
        tb_tipo_resultado_elisa: {
          select: {
            ds_resultado_elisa: true,
            no_filtro: true
          }
        },
        tb_tipo_resultado_hivib: {
          select: {
            ds_resultado_hivib: true,
            no_filtro: true
          }
        },
        tb_unidade_saude_solicitante: {
          select: {
            cnes_unidade: true,
            no_unidade: true,
            id_coordenadoria: true,
            id_supervisao: true,
            id_uvis: true,
          }
        },
        tb_unidade_saude_laboratorio: {
          select: {
            cnes_unidade: true,
            no_unidade: true,
            id_coordenadoria: true,
          }
        }
      }
    });
  
    // Retorna os dados paginados e o total de registros
    return { total, records, page, lastPage: Math.ceil(total / limit) };
  }
      

  

  findOne(id: number) {
    return this.prisma.tb_exame_hiv_elisa_ib.findUnique({
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
        tb_tipo_resultado_elisa: {
          select: {
            ds_resultado_elisa: true,
            no_filtro: true
          }
        },
        tb_tipo_resultado_hivib: {
          select: {
            ds_resultado_hivib: true,
            no_filtro: true
          }
        },
        tb_unidade_saude_solicitante: {
          select: {
            cnes_unidade: true,
            no_unidade: true,
            id_coordenadoria: true,
            id_supervisao: true,
            id_uvis: true,
          }
        },
        tb_unidade_saude_laboratorio: {
          select: {
            cnes_unidade: true,
            no_unidade: true,
            id_coordenadoria: true,
          }
        }
      }
    });
  }

  async remove(id: number, userKeycloak: any) {

    const deletedRecord = await this.findOne( id );

    deletedRecord.dt_cadastro_resultado = new Date(deletedRecord.dt_cadastro_resultado||'');
    deletedRecord.dt_cadastro_resultado.setMinutes(
      deletedRecord.dt_cadastro_resultado.getMinutes() + deletedRecord.dt_cadastro_resultado.getTimezoneOffset()
    );


    await this.usuariologService.logAction(
      userKeycloak.sub,
      userKeycloak.preferred_username,
      'Delete',
      'tb_exame_hiv_elisa_ib',
      id,
      'Registro tb_exame_hiv_elisa_ib deletado do paciente (CNS: ' + 
      (deletedRecord.tb_paciente.cns_paciente || '') + '\n' + // Adicionando quebra de linha
      'Nome: ' + 
      (deletedRecord.tb_paciente.no_paciente || '') + 
      ')' + '\n' + // Adicionando quebra de linha
      'Data Resultado: ' + (deletedRecord.dt_cadastro_resultado || '') + '\n' + // Adicionando quebra de linha
      'Resultado Elisa: ' + (deletedRecord.tb_tipo_resultado_elisa.ds_resultado_elisa || '') 
    );



    return this.prisma.tb_exame_hiv_elisa_ib.delete({
      where: { id },
    });
  }

}

import { Inject, Injectable } from '@nestjs/common';
import { CreateTbcargaviralDto } from './dto/create-tbcargaviral.dto';
import { UpdateTbcargaviralDto } from './dto/update-tbcargaviral.dto';
import { tb_carga_viral } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { TenantService } from 'src/tenant/tenant/tenant.service';
import { UsuariologService } from 'src/usuariolog/usuariolog.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TbcargaviralService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly tenantService: TenantService;
  @Inject()
  private readonly usuariologService: UsuariologService;

  async create(createTbcargaviralDto: CreateTbcargaviralDto, userKeycloak: any) {

    if (createTbcargaviralDto.dt_solicitacao)
    {
      createTbcargaviralDto.dt_solicitacao = new Date(createTbcargaviralDto.dt_solicitacao||'');
      createTbcargaviralDto.dt_solicitacao.setMinutes(
        createTbcargaviralDto.dt_solicitacao.getMinutes() + createTbcargaviralDto.dt_solicitacao.getTimezoneOffset()
      );
    }

      if (createTbcargaviralDto.dt_recebimento)
      {
        createTbcargaviralDto.dt_recebimento = new Date(createTbcargaviralDto.dt_recebimento||'');
        createTbcargaviralDto.dt_recebimento.setMinutes(
          createTbcargaviralDto.dt_recebimento.getMinutes() + createTbcargaviralDto.dt_recebimento.getTimezoneOffset()
        );
      }

      const existingRecord = await this.prisma.tb_carga_viral.findFirst({
        where: {
          codigo: createTbcargaviralDto.codigo,
          id_paciente: createTbcargaviralDto.id_paciente,
          id_tipo_resultado_carga_viral: createTbcargaviralDto.id_tipo_resultado_carga_viral,
          dt_recebimento: createTbcargaviralDto.dt_recebimento,
        },
      });
      if (existingRecord) {
      	throw new Error('Já existe um registro com esse no_filtro.');
      }
      const newRecord = await this.prisma.tb_carga_viral.create({
      	data: createTbcargaviralDto,
      });

      await this.usuariologService.logAction(
      	userKeycloak.sub,
      	userKeycloak.preferred_username,
      	'Create',
      	'tb_carga_viral',
      	newRecord.id,
      	'Criando registro tb_carga_viral com ID:'+ newRecord.id||''
    	  );

    return newRecord;
  }

  //async findAll() {
  //  return await this.prisma.tb_carga_viral.findMany();
  //}

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


        // Filtrar dinamicamente com base nos campos do filtro
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

        if (parsedFilters.id_tipo_resultado_carga_viral) {
          where.id_tipo_resultado_carga_viral = parsedFilters.id_tipo_resultado_carga_viral
        };
        
        if (parsedFilters.tb_unidade_solicitante) {
          where.tb_unidade_solicitante = {
            ...parsedFilters.tb_unidade_solicitante
          };
        }
  
      } catch (error) {
        throw new Error('Invalid filter format');
      }
    }
  
    // Verifique se 'limit' e 'page' são valores válidos
    const total = await this.prisma.tb_carga_viral.count({
      where, // Aplica o filtro dinamicamente
    });
  
    // Consulta com valores válidos de skip e take
    const records = await this.prisma.tb_carga_viral.findMany({
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
        tb_tipo_resultado_carga_viral: {
          select: {
            no_tipo_resultado_carga_viral: true,
            no_filtro: true
          }
        },
        tb_unidade_solicitante: {
          select: {
            cnes_unidade: true,
            no_unidade: true,
            id_coordenadoria: true,
            id_supervisao: true,
            id_uvis: true,
          }
        },
        tb_unidade_executora: {
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
    return this.prisma.tb_carga_viral.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTbcargaviralDto: UpdateTbcargaviralDto, userKeycloak: any) {

      updateTbcargaviralDto.dt_solicitacao = new Date(updateTbcargaviralDto.dt_solicitacao||'');
      updateTbcargaviralDto.dt_solicitacao.setMinutes(
        updateTbcargaviralDto.dt_solicitacao.getMinutes() + updateTbcargaviralDto.dt_solicitacao.getTimezoneOffset()
      );
      updateTbcargaviralDto.dt_recebimento = new Date(updateTbcargaviralDto.dt_recebimento||'');
      updateTbcargaviralDto.dt_recebimento.setMinutes(
        updateTbcargaviralDto.dt_recebimento.getMinutes() + updateTbcargaviralDto.dt_recebimento.getTimezoneOffset()
      );

    const updatedRecord = await this.prisma.tb_carga_viral.update({
      where: { id },
      data: updateTbcargaviralDto
    });

    await this.usuariologService.logAction(
      userKeycloak.sub,
      userKeycloak.preferred_username,
      'Update',
      'tb_carga_viral',
      updatedRecord.id,
      'Atualizado registro tb_carga_viral com ID:' + updatedRecord.id||''
    );

    return updatedRecord;

  }

  remove(id: number, userKeycloak: any) {
    return this.prisma.tb_carga_viral.delete({
      where: { id },
    });
  }

}


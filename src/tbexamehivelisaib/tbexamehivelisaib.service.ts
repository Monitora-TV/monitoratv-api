import { Inject, Injectable } from '@nestjs/common';
import { CreateTbexamehivelisaibDto } from './dto/create-tbexamehivelisaib.dto';
import { UpdateTbexamehivelisaibDto } from './dto/update-tbexamehivelisaib.dto';
import { PrismaService } from 'src/database/prisma.service';
import { TenantService } from 'src/tenant/tenant/tenant.service';
import { UsuariologService } from 'src/usuariolog/usuariolog.service';

@Injectable()
export class TbexamehivelisaibService {
  @Inject()  private readonly prisma: PrismaService;
  @Inject()  private readonly tenantService: TenantService;
  @Inject()  private readonly usuariologService: UsuariologService;

  async create(createTbexamehivelisaibDto: CreateTbexamehivelisaibDto, userKeycloak: any) {
      createTbexamehivelisaibDto.dt_cadastro_resultado = new Date(createTbexamehivelisaibDto.dt_cadastro_resultado||'');
      createTbexamehivelisaibDto.dt_cadastro_resultado.setMinutes(
        createTbexamehivelisaibDto.dt_cadastro_resultado.getMinutes() + createTbexamehivelisaibDto.dt_cadastro_resultado.getTimezoneOffset()
      );
      createTbexamehivelisaibDto.dt_atualizacao = new Date(createTbexamehivelisaibDto.dt_atualizacao||'');
      createTbexamehivelisaibDto.dt_atualizacao.setMinutes(
        createTbexamehivelisaibDto.dt_atualizacao.getMinutes() + createTbexamehivelisaibDto.dt_atualizacao.getTimezoneOffset()
      );

      const existingRecord = await this.prisma.tb_exame_hiv_elisa_ib.findFirst({
        where: {
          AND: [
            { id_paciente: createTbexamehivelisaibDto.id_paciente },
            { dt_cadastro_resultado: createTbexamehivelisaibDto.dt_cadastro_resultado },
          ],
        },
      });
      
      if (existingRecord) {
        throw new Error('Já existe um registro com esse no_filtro.');
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
  
        // Filtrar dinamicamente com base nos campos do filtro
        if (parsedFilters.tb_paciente) {
          where.tb_paciente = {
            ...parsedFilters.tb_paciente
          };
        }
  
        if (parsedFilters.tb_tipo_resultado_elisa) {
          where.tb_tipo_resultado_elisa = {
            ...parsedFilters.tb_tipo_resultado_elisa
          };
        }
  
        if (parsedFilters.tb_unidade_saude_solicitante) {
          where.tb_unidade_saude_solicitante = {
            ...parsedFilters.tb_unidade_saude_solicitante
          };
        }
  
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
    });
  }

  async update(id: number, updateTbexamehivelisaibDto: UpdateTbexamehivelisaibDto, userKeycloak: any) {

      updateTbexamehivelisaibDto.dt_cadastro_resultado = new Date(updateTbexamehivelisaibDto.dt_cadastro_resultado||'');
      updateTbexamehivelisaibDto.dt_cadastro_resultado.setMinutes(
        updateTbexamehivelisaibDto.dt_cadastro_resultado.getMinutes() + updateTbexamehivelisaibDto.dt_cadastro_resultado.getTimezoneOffset()
      );
      updateTbexamehivelisaibDto.dt_atualizacao = new Date(updateTbexamehivelisaibDto.dt_atualizacao||'');
      updateTbexamehivelisaibDto.dt_atualizacao.setMinutes(
        updateTbexamehivelisaibDto.dt_atualizacao.getMinutes() + updateTbexamehivelisaibDto.dt_atualizacao.getTimezoneOffset()
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

  remove(id: number, userKeycloak: any) {
    return this.prisma.tb_exame_hiv_elisa_ib.delete({
      where: { id },
    });
  }

}

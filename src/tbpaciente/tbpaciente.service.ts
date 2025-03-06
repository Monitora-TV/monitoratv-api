import { Inject, Injectable } from '@nestjs/common';
import { CreateTbpacienteDto } from './dto/create-tbpaciente.dto';
import { UpdateTbpacienteDto } from './dto/update-tbpaciente.dto';
import { tb_paciente } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { TenantService } from 'src/tenant/tenant/tenant.service';
import { UsuariologService } from 'src/usuariolog/usuariolog.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TbpacienteService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly tenantService: TenantService;
  @Inject()
  private readonly usuariologService: UsuariologService;

  async create(createTbpacienteDto: CreateTbpacienteDto, userKeycloak: any) {
      createTbpacienteDto.dt_nascimento = new Date(createTbpacienteDto.dt_nascimento||'');
      createTbpacienteDto.dt_nascimento.setMinutes(
        createTbpacienteDto.dt_nascimento.getMinutes() + createTbpacienteDto.dt_nascimento.getTimezoneOffset()
      );
      createTbpacienteDto.dt_atualizacao = new Date(createTbpacienteDto.dt_atualizacao||'');
      createTbpacienteDto.dt_atualizacao.setMinutes(
        createTbpacienteDto.dt_atualizacao.getMinutes() + createTbpacienteDto.dt_atualizacao.getTimezoneOffset()
      );

      const existingRecord = await this.prisma.tb_paciente.findFirst({
        where: {
        		cns_paciente: createTbpacienteDto.cns_paciente,
            flg_crianca: createTbpacienteDto.flg_crianca,
            flg_gestante: createTbpacienteDto.flg_gestante,
        },
      });
      if (existingRecord) {
      	throw new Error('Já existe um registro com esse CNS.');
      }
      const newRecord = await this.prisma.tb_paciente.create({
      	data: createTbpacienteDto,
      });

      await this.usuariologService.logAction(
      	userKeycloak.sub,
      	userKeycloak.preferred_username,
      	'Create',
      	'tb_paciente',
      	newRecord.id,
      	'Criando registro tb_paciente com ID:'+ newRecord.id||''
    	  );

    return newRecord;
  }


  async findAll(page: number, limit: number, filters?: string) {
    // Garantir que o skip é um número válido
    const skip = (page > 0 ? page - 1 : 0) * (limit > 0 ? limit : 10); // Se 'page' ou 'limit' não forem válidos, use valores padrão

    // Defina um objeto onde todos os filtros serão aplicados dinamicamente
    const where: any = {};
  
    if (filters) {
      try {
        // Caso o filtro seja passado como string, tenta-se fazer o parse para um objeto
        const parsedFilters = JSON.parse(filters);

        console.log(parsedFilters);


        if (parsedFilters.flg_crianca) {
          where.flg_crianca = parsedFilters.flg_crianca
        }

        if (parsedFilters.flg_gestante) {
          where.flg_gestante = parsedFilters.flg_gestante
        }

        if (parsedFilters.dt_nascimento) {
          let filterDtNascimento = new Date(parsedFilters.dt_nascimento||'');
          filterDtNascimento.setMinutes(
            filterDtNascimento.getMinutes() + filterDtNascimento.getTimezoneOffset()
          );
    
          where.dt_nascimento = filterDtNascimento
        }

        if (parsedFilters.no_paciente) {
          where.no_paciente = {
            contains: parsedFilters.no_paciente, // Busca parcial
            mode: 'insensitive', // Torna a busca insensível a maiúsculas/minúsculas
          }
        }

        if (parsedFilters.cns_paciente) {
          where.cns_paciente = parsedFilters.cns_paciente
        }

  
      } catch (error) {
        throw new Error('Invalid filter format');
      }
    }
  
    // Verifique se 'limit' e 'page' são valores válidos
    const total = await this.prisma.tb_paciente.count({
      where, // Aplica o filtro dinamicamente
    });
  
    // Consulta com valores válidos de skip e take
    const records = await this.prisma.tb_paciente.findMany({
      skip,
      take: Number(limit), // 'take' deve ser um número válido (limit)
      where, // Aplica o filtro dinamicamente
      include: {
        tb_paciente_mae: {
          select: {
            cns_paciente: true,
            dt_nascimento: true,
            flg_crianca: true,
            flg_gestante: true,
            no_paciente: true,
          }
        },
        tb_escolaridade: {
          select: {
            no_escolaridade: true,
          }
        },
        tb_raca_cor: {
          select: {
            no_raca_cor: true,
          }
        },
        tb_situacao_familiar: {
          select: {
            no_situacao_familiar: true,
          }
        },
      }
    });
  
    // Retorna os dados paginados e o total de registros
    return { total, records, page, lastPage: Math.ceil(total / limit) };
  }


  findOne(id: number) {
    return this.prisma.tb_paciente.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTbpacienteDto: UpdateTbpacienteDto, userKeycloak: any) {

    if (updateTbpacienteDto.dt_nascimento)
      {
        updateTbpacienteDto.dt_nascimento = new Date(updateTbpacienteDto.dt_nascimento||'');
        updateTbpacienteDto.dt_nascimento.setMinutes(
          updateTbpacienteDto.dt_nascimento.getMinutes() + updateTbpacienteDto.dt_nascimento.getTimezoneOffset()
        );
      }
  
    const updatedRecord = await this.prisma.tb_paciente.update({
      where: { id },
      data: updateTbpacienteDto,
    });

    await this.usuariologService.logAction(
      userKeycloak.sub,
      userKeycloak.preferred_username,
      'Update',
      'tb_paciente',
      updatedRecord.id,
      'Atualizado registro tb_paciente com ID:' + updatedRecord.id||''
    );

    return updatedRecord;

  }

  remove(id: number, userKeycloak: any) {
    return this.prisma.tb_paciente.delete({
      where: { id },
    });
  }

}

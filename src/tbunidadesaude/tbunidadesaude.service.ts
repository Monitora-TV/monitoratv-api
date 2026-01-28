
import { Inject, Injectable } from '@nestjs/common';
import { CreateTbunidadesaudeDto } from './dto/create-tbunidadesaude.dto';
import { UpdateTbunidadesaudeDto } from './dto/update-tbunidadesaude.dto';
import { tb_unidade_saude } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { TenantService } from 'src/tenant/tenant.service';
import { UsuariologService } from 'src/usuariolog/usuariolog.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TbunidadesaudeService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly tenantService: TenantService;
  @Inject()
  private readonly usuariologService: UsuariologService;

  async create(createTbunidadesaudeDto: CreateTbunidadesaudeDto, userKeycloak: any) {

      const existingRecord = await this.prisma.tb_unidade_saude.findFirst({
        where: {
        		cnes_unidade: createTbunidadesaudeDto.cnes_unidade,
        },
      });
      if (existingRecord) {
      	throw new Error('Já existe um registro com esse CNES.');
      }
      const newRecord = await this.prisma.tb_unidade_saude.create({
      	data: createTbunidadesaudeDto,
      });

      await this.usuariologService.logAction(
      	userKeycloak.sub,
      	userKeycloak.preferred_username,
      	'Create',
      	'tb_unidade_saude',
      	newRecord.id,
      	'Criando registro tb_unidade_saude com CNES:'+ newRecord.cnes_unidade||''
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

        if (parsedFilters.is_sae) {
          where.is_sae = parsedFilters.is_sae
        }

        if (parsedFilters.is_maternidade) {
          where.is_maternidade = parsedFilters.is_maternidade
        }

        if (parsedFilters.is_laboratorio) {
          where.is_laboratorio = parsedFilters.is_laboratorio
        }


        if (parsedFilters.cnes_unidade) {
          where.cnes_unidade = parsedFilters.cnes_unidade
        }

        if (parsedFilters.id_coordenadoria) {
          where.id_coordenadoria = parsedFilters.id_coordenadoria
        }

        if (parsedFilters.id_supervisao) {
          where.id_supervisao = parsedFilters.id_supervisao
        }

        if (parsedFilters.id_uvis) {
          where.id_uvis = parsedFilters.id_supervisao
        }


        if (parsedFilters.no_unidade) {
          where.no_unidade = {
            contains: parsedFilters.no_unidade, // Busca parcial
            mode: 'insensitive', // Torna a busca insensível a maiúsculas/minúsculas
          }
        }

      } catch (error) {
        throw new Error('Invalid filter format');
      }
    }
  
    // Verifique se 'limit' e 'page' são valores válidos
    const total = await this.prisma.tb_unidade_saude.count({
      where, // Aplica o filtro dinamicamente
    });
  
    // Consulta com valores válidos de skip e take
    const records = await this.prisma.tb_unidade_saude.findMany({
      skip,
      take: Number(limit), // 'take' deve ser um número válido (limit)
      where, // Aplica o filtro dinamicamente
      include: {
        tb_coordenadoria: {
          select: {
            no_coordenadoria: true,
          }
        },
        tb_supervisao: {
          select: {
            no_supervisao: true,
          }
        },
        tb_uvis: {
          select: {
            no_uvis: true,
          }
        },
      }
    });
  
    // Retorna os dados paginados e o total de registros
    return { total, records, page, lastPage: Math.ceil(total / limit) };
  }



  findOne(id: number) {
    return this.prisma.tb_unidade_saude.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTbunidadesaudeDto: UpdateTbunidadesaudeDto, userKeycloak: any) {

    const updatedRecord = await this.prisma.tb_unidade_saude.update({
      where: { id },
      data: updateTbunidadesaudeDto,
    });

    await this.usuariologService.logAction(
      userKeycloak.sub,
      userKeycloak.preferred_username,
      'Update',
      'tb_unidade_saude',
      updatedRecord.id,
      'Atualizado registro tb_unidade_saude com CNES:' + updatedRecord.cnes_unidade||''
    );

    return updatedRecord;

  }

  remove(id: number, userKeycloak: any) {
    return this.prisma.tb_unidade_saude.delete({
      where: { id },
    });
  }

}

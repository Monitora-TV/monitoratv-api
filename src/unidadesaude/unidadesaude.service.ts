import { Inject, Injectable } from '@nestjs/common';
import { CreateUnidadesaudeDto } from './dto/create-unidadesaude.dto';
import { UpdateUnidadesaudeDto } from './dto/update-unidadesaude.dto';
import { FindUnidadesaudeDto } from './dto/find-unidadesaude.dto';
import { PrismaService } from 'src/database/prisma.service'; // Prisma para interação com o banco
import { TenantService } from 'src/tenant/tenant/tenant.service'; // Serviço de Tenant (acesso controlado)


@Injectable()
export class UnidadesaudeService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly tenantService: TenantService;


  // Método para criar um novo registro
  async create(createUnidadesaudeDto: CreateUnidadesaudeDto) {
    const existingRecord = await this.prisma.tb_unidade_saude.findFirst({
      where: {
        cnes_unidade: createUnidadesaudeDto.cnes_unidade, // Verifica se o 'no_filtro' já existe
      },
    });

    if (existingRecord) {
      throw new Error('Já existe um registro com esse cnes.');
    }

    const newRecord = await this.prisma.tb_unidade_saude.create({
      data: createUnidadesaudeDto,
    });

    return newRecord;
  }

  // Método para obter todos os registros
  async findAll() {
    console.log(this.tenantService.hierarquia_acesso);
    return await this.prisma.tb_unidade_saude.findMany();
  }

  async findMany(findUnidadesaudeDto: FindUnidadesaudeDto) {
    //const  { no_unidade, cnes_unidade, no_unidade_limpo }

  };
  



  // Método para encontrar um registro específico por id
  findOne(id: number) {
    return this.prisma.tb_unidade_saude.findUnique({
      where: { id },
    });
  }


  // Método para atualizar um registro
  update(id: number, updateUnidadesaudeDto: UpdateUnidadesaudeDto) {
    return this.prisma.tb_unidade_saude.update({
      where: { id },
      data: updateUnidadesaudeDto,
    });
  }

  // Método para remover um registro
  remove(id: number) {
    return this.prisma.tb_unidade_saude.delete({
      where: { id },
    });
  }

}

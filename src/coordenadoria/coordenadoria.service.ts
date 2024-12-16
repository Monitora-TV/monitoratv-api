import { Inject, Injectable } from '@nestjs/common';
import { CreateCoordenadoriaDto } from './dto/create-coordenadoria.dto';
import { UpdateCoordenadoriaDto } from './dto/update-coordenadoria.dto';
import { PrismaService } from 'src/database/prisma.service'; // Prisma para interação com o banco
import { TenantService } from 'src/tenant/tenant/tenant.service'; // Serviço de Tenant (acesso controlado)


@Injectable()
export class CoordenadoriaService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly tenantService: TenantService;

  // Método para criar um novo registro
  async create(createCoordenadoriaDto: CreateCoordenadoriaDto) {
    const existingRecord = await this.prisma.tb_coordenadoria.findFirst({
      where: {
        cnes_coordenadoria: createCoordenadoriaDto.cnes_coordenadoria, // Verifica se o 'no_filtro' já existe
      },
    });

    if (existingRecord) {
      throw new Error('Já existe um registro com esse cnes.');
    }

    const newRecord = await this.prisma.tb_coordenadoria.create({
      data: createCoordenadoriaDto,
    });

    return newRecord;
  }

  // Método para obter todos os registros
  async findAll() {
    console.log(this.tenantService.hierarquia_acesso);
    return await this.prisma.tb_coordenadoria.findMany();
  }

  // Método para encontrar um registro específico por id
  findOne(id: number) {
    return this.prisma.tb_coordenadoria.findUnique({
      where: { id },
    });
  }

  // Método para atualizar um registro
  update(id: number, updateCoordenadoriaDto: UpdateCoordenadoriaDto) {
    return this.prisma.tb_coordenadoria.update({
      where: { id },
      data: updateCoordenadoriaDto,
    });
  }

  // Método para remover um registro
  remove(id: number) {
    return this.prisma.tb_coordenadoria.delete({
      where: { id },
    });
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CreateAlertacriancaexpostahivDto } from './dto/create-alertacriancaexpostahiv.dto';
import { UpdateAlertacriancaexpostahivDto } from './dto/update-alertacriancaexpostahiv.dto';
import { PrismaService } from 'src/database/prisma.service'; // Prisma para interação com o banco
import { TenantService } from 'src/tenant/tenant/tenant.service'; // Serviço de Tenant (acesso controlado)


@Injectable()
export class AlertacriancaexpostahivService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly tenantService: TenantService;

  // Método para criar um novo registro
  async create(createAlertacriancaexpostahivDto: CreateAlertacriancaexpostahivDto) {
    const existingRecord = await this.prisma.tb_alerta_criancaexposta_hiv.findFirst({
      where: {
        ds_alerta_reduzido_criancaexposta_hiv: createAlertacriancaexpostahivDto.ds_alerta_reduzido_criancaexposta_hiv, // Verifica se já existe
      },
    });

    if (existingRecord) {
      throw new Error('Já existe um registro com esse no_filtro.');
    }

    const newRecord = await this.prisma.tb_alerta_criancaexposta_hiv.create({
      data: createAlertacriancaexpostahivDto,
    });

    return newRecord;
  }


  // Método para obter todos os registros
  async findAll() {
    console.log(this.tenantService.hierarquia_acesso);
    return await this.prisma.tb_alerta_criancaexposta_hiv.findMany();
  }

  // Método para encontrar um registro específico por id
  findOne(id: number) {
    return this.prisma.tb_alerta_criancaexposta_hiv.findUnique({
      where: { id },
    });
  }

  // Método para atualizar um registro
  update(id: number, updateAlertacriancaexpostahivDto: UpdateAlertacriancaexpostahivDto) {
    return this.prisma.tb_alerta_criancaexposta_hiv.update({
      where: { id },
      data: updateAlertacriancaexpostahivDto,
    });
  }

  // Método para remover um registro
  remove(id: number) {
    return this.prisma.tb_alerta_criancaexposta_hiv.delete({
      where: { id },
    });
  }
}

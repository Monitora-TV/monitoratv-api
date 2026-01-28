import { Inject, Injectable } from '@nestjs/common';
import { CreateTbalertagestantehivDto } from './dto/create-tbalertagestantehiv.dto';
import { UpdateTbalertagestantehivDto } from './dto/update-tbalertagestantehiv.dto';
import { PrismaService } from 'src/database/prisma.service';
import { TenantService } from 'src/tenant/tenant.service';

@Injectable()
export class TbalertagestantehivService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly tenantService: TenantService;

  async create(createTbalertagestantehivDto: CreateTbalertagestantehivDto) {
    const existingRecord = await this.prisma.tb_alerta_gestante_hiv.findFirst({
      where: {
        ds_alerta_reduzido_gestante_hiv: createTbalertagestantehivDto.ds_alerta_reduzido_gestante_hiv,
      },
    });
    if (existingRecord) {
      throw new Error('Já existe um registro com esse ds_alerta_reduzido_gestante_hiv.');
    }
    const newRecord = await this.prisma.tb_alerta_gestante_hiv.create({
      data: createTbalertagestantehivDto,
    });
    return newRecord;
  }

  async findAll() {
    return await this.prisma.tb_alerta_gestante_hiv.findMany();
  }

  findOne(id: number) {
    return this.prisma.tb_alerta_gestante_hiv.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTbalertagestantehivDto: UpdateTbalertagestantehivDto) {
    return this.prisma.tb_alerta_gestante_hiv.update({
      where: { id },
      data: updateTbalertagestantehivDto,
    });
  }

  remove(id: number) {
    return this.prisma.tb_alerta_gestante_hiv.delete({
      where: { id },
    });
  }

}


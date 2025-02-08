import { Inject, Injectable } from '@nestjs/common';
import { CreateTbdesfechogestantehivDto } from './dto/create-tbdesfechogestantehiv.dto';
import { UpdateTbdesfechogestantehivDto } from './dto/update-tbdesfechogestantehiv.dto';
import { PrismaService } from 'src/database/prisma.service';
import { TenantService } from 'src/tenant/tenant/tenant.service';

@Injectable()
export class TbdesfechogestantehivService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly tenantService: TenantService;

  async create(createTbdesfechogestantehivDto: CreateTbdesfechogestantehivDto) {
    const existingRecord = await this.prisma.tb_desfecho_gestante_hiv.findFirst({
      where: {
        no_desfecho_gestante_hiv: createTbdesfechogestantehivDto.no_desfecho_gestante_hiv,
      },
    });
    if (existingRecord) {
      throw new Error('Já existe um registro com esse no_desfecho_gestante_hiv.');
    }
    const newRecord = await this.prisma.tb_desfecho_gestante_hiv.create({
      data: createTbdesfechogestantehivDto,
    });
    return newRecord;
  }

  async findAll() {
    return await this.prisma.tb_desfecho_gestante_hiv.findMany();
  }

  findOne(id: number) {
    return this.prisma.tb_desfecho_gestante_hiv.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTbdesfechogestantehivDto: UpdateTbdesfechogestantehivDto) {
    return this.prisma.tb_desfecho_gestante_hiv.update({
      where: { id },
      data: updateTbdesfechogestantehivDto,
    });
  }

  remove(id: number) {
    return this.prisma.tb_desfecho_gestante_hiv.delete({
      where: { id },
    });
  }

}


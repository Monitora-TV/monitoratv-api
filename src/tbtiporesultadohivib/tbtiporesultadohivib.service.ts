import { Inject, Injectable } from '@nestjs/common';
import { CreateTbtiporesultadohivibDto } from './dto/create-tbtiporesultadohivib.dto';
import { UpdateTbtiporesultadohivibDto } from './dto/update-tbtiporesultadohivib.dto';
import { PrismaService } from 'src/database/prisma.service';
import { TenantService } from 'src/tenant/tenant/tenant.service';
import { UsuariologService } from 'src/usuariolog/usuariolog.service';

@Injectable()
export class TbtiporesultadohivibService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createTbtiporesultadohivibDto: CreateTbtiporesultadohivibDto) {

      const existingRecord = await this.prisma.tb_tipo_resultado_hivib.findFirst({
        where: {
        		no_filtro: createTbtiporesultadohivibDto.no_filtro,
        },
      });
      if (existingRecord) {
      	throw new Error('Já existe um registro com esse no_filtro.');
      }
      const newRecord = await this.prisma.tb_tipo_resultado_hivib.create({
      	data: createTbtiporesultadohivibDto,
      });

    return newRecord;
  }

  async findAll() {
    return await this.prisma.tb_tipo_resultado_hivib.findMany();
  }

  findOne(id: number) {
    return this.prisma.tb_tipo_resultado_hivib.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTbtiporesultadohivibDto: UpdateTbtiporesultadohivibDto) {
    const updatedRecord = await this.prisma.tb_tipo_resultado_hivib.update({
      where: { id },
      data: updateTbtiporesultadohivibDto,
    });
    return updatedRecord;
  }

  remove(id: number ) {
    return this.prisma.tb_tipo_resultado_hivib.delete({
      where: { id },
    });
  }

}

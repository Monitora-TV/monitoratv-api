import { Inject, Injectable } from '@nestjs/common';
import { CreateTbperiodoarvnascimentoDto } from './dto/create-tbperiodoarvnascimento.dto';
import { UpdateTbperiodoarvnascimentoDto } from './dto/update-tbperiodoarvnascimento.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class TbperiodoarvnascimentoService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createTbperiodoarvnascimentoDto: CreateTbperiodoarvnascimentoDto) {
      const newRecord = await this.prisma.tb_periodo_arv_nascimento.create({
      	data: createTbperiodoarvnascimentoDto,
      });

    return newRecord;
  }

  async findAll() {
    return await this.prisma.tb_periodo_arv_nascimento.findMany();
  }

  findOne(id: number) {
    return this.prisma.tb_periodo_arv_nascimento.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTbperiodoarvnascimentoDto: UpdateTbperiodoarvnascimentoDto) {

    const updatedRecord = await this.prisma.tb_periodo_arv_nascimento.update({
      where: { id },
      data: updateTbperiodoarvnascimentoDto,
    });
    return updatedRecord;

  }

  remove(id: number ) {
    return this.prisma.tb_periodo_arv_nascimento.delete({
      where: { id },
    });
  }

}

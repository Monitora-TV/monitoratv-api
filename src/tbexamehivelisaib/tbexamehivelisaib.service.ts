import { Inject, Injectable } from '@nestjs/common';
import { CreateTbexamehivelisaibDto } from './dto/create-tbexamehivelisaib.dto';
import { UpdateTbexamehivelisaibDto } from './dto/update-tbexamehivelisaib.dto';
import { tb_exame_hiv_elisa_ib } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { TenantService } from 'src/tenant/tenant/tenant.service';

@Injectable()
export class TbexamehivelisaibService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly tenantService: TenantService;

  async create(createTbexamehivelisaibDto: CreateTbexamehivelisaibDto) {
    /*
    const existingRecord = await this.prisma.tb_exame_hiv_elisa_ib.findFirst({
      where: {
        no_filtro: createTbexamehivelisaibDto.no_filtro,
      },
    });
    if (existingRecord) {
      throw new Error('Já existe um registro com esse no_filtro.');
    }
    */  

    const newRecord = await this.prisma.tb_exame_hiv_elisa_ib.create({
      data: createTbexamehivelisaibDto,
    });
    return newRecord;
  }

  /*
  async findAll(page: number, limit: number, id_paciente?: number) {
    const skip = (page - 1) * limit;
    const where = id_paciente ? { id_paciente } : {}; // Se id_paciente for fornecido, adiciona o filtro
    const total = await this.prisma.tb_exame_hiv_elisa_ib.count({
      where, // Aplica o filtro
    });
  
    const items = await this.prisma.tb_exame_hiv_elisa_ib.findMany({
      skip,
      take: Number(limit),
      where, // Aplica o filtro na consulta findMany
    });
  
    return {
      data: items,
      total, 
      page, 
      lastPage: Math.ceil(total / limit) };
  }
  */

  async findAll(page: number, limit: number, id_paciente?: number) {
    const skip = (page - 1) * limit;
  
    // Certifique-se de que id_paciente seja tratado como número
    const where = id_paciente ? { id_paciente: Number(id_paciente) } : {}; 
  
    const total = await this.prisma.tb_exame_hiv_elisa_ib.count({
      where, // Aplica o filtro se id_paciente foi fornecido
    });
  
    const items = await this.prisma.tb_exame_hiv_elisa_ib.findMany({
      skip,
      take: Number(limit),
      where, // Aplica o filtro se id_paciente foi fornecido
    });
  
    return { total, items, page, lastPage: Math.ceil(total / limit) };
  }
  

  /*  
    return {
      data: items,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  */  
  

  findOne(id: number) {
    return this.prisma.tb_exame_hiv_elisa_ib.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTbexamehivelisaibDto: UpdateTbexamehivelisaibDto) {
    return this.prisma.tb_exame_hiv_elisa_ib.update({
      where: { id },
      data: updateTbexamehivelisaibDto,
    });
  }

  remove(id: number) {
    return this.prisma.tb_exame_hiv_elisa_ib.delete({
      where: { id },
    });
  }

}


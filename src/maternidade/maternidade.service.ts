import { Inject, Injectable } from '@nestjs/common';
import { CreateMaternidadeDto } from './dto/create-maternidade.dto';
import { UpdateMaternidadeDto } from './dto/update-maternidade.dto';
import { PrismaService } from 'src/database/prisma.service'; // Prisma para interação com o banco
import { UserContextService } from 'src/auth/user-context/user-context.service';

@Injectable()
export class MaternidadeService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly userContextService: UserContextService;

  // Método para criar um novo registro
  async create(createMaternidadeDto: CreateMaternidadeDto) {
    const existingRecord = await this.prisma.tb_maternidade.findFirst({
      where: {
        cnes_maternidade: createMaternidadeDto.cnes_maternidade, // Verifica se o CNES já existe
      },
    });

    if (existingRecord) {
      throw new Error('Já existe uma Maternidade com esse CNES.');
    }

    const newRecord = await this.prisma.tb_maternidade.create({
      data: createMaternidadeDto,
    });

    return newRecord;
  }

  // Método para obter todos os registros
  async findAll() {
    console.log(this.userContextService.hierarquia);
    return await this.prisma.tb_maternidade.findMany();
  }


  // Método para encontrar um registro específico por id
  findOne(id: number) {
    return this.prisma.tb_maternidade.findUnique({
      where: { id },
    });
  }

  // Método para atualizar um registro
  update(id: number, updateMaternidadeDto: UpdateMaternidadeDto) {
    return this.prisma.tb_maternidade.update({
      where: { id },
      data: updateMaternidadeDto,
    });
  }

  // Método para remover um registro
  remove(id: number) {
    return this.prisma.tb_maternidade.delete({
      where: { id },
    });
  }
}




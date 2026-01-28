import { Inject, Injectable } from '@nestjs/common';
import { CreateDesfechocriancaexpostahivDto } from './dto/create-desfechocriancaexpostahiv.dto';
import { UpdateDesfechocriancaexpostahivDto } from './dto/update-desfechocriancaexpostahiv.dto';
import { PrismaService } from 'src/database/prisma.service'; // Prisma para interação com o banco
import { UserContextService } from 'src/auth/user-context/user-context.service';
@Injectable()
export class DesfechocriancaexpostahivService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly userContextService: UserContextService;

  // Método para criar um novo registro
  async create(createDesfechocriancaexpostahivDto: CreateDesfechocriancaexpostahivDto) {

    // Procurar por um registro existente
    const existingRecord = await this.prisma.tb_desfecho_criancaexposta_hiv.findFirst({
      where: {
        no_filtro: createDesfechocriancaexpostahivDto.no_filtro, // Verifica se o 'no_filtro' já existe
      },
    });
  
    let record;
  
    // Se o registro existir, fazer um update
    if (existingRecord) {
      record = await this.update(+existingRecord.id, existingRecord);
    }
    // Se o registro não existir, criar um novo
    else {
      record = await this.prisma.tb_desfecho_criancaexposta_hiv.create({
        data: createDesfechocriancaexpostahivDto,
      });
    }
  
    return record;
  }
  
  // Método para obter todos os registros
  async findAll() {
    console.log(this.userContextService.hierarquia);
    return await this.prisma.tb_desfecho_criancaexposta_hiv.findMany();
  }

  // Método para encontrar um registro específico por id
  findOne(id: number) {
    return this.prisma.tb_desfecho_criancaexposta_hiv.findUnique({
      where: { id },
    });
  }

  // Método para atualizar um registro
  update(id: number, updateDesfechocriancaexpostahivDto: UpdateDesfechocriancaexpostahivDto) {
    return this.prisma.tb_desfecho_criancaexposta_hiv.update({
      where: { id },
      data: updateDesfechocriancaexpostahivDto,
    });
  }

  // Método para remover um registro
  remove(id: number) {
    return this.prisma.tb_desfecho_criancaexposta_hiv.delete({
      where: { id },
    });
  }
}

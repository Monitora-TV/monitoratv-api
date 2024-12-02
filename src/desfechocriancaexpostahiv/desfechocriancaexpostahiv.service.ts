import { Inject, Injectable } from '@nestjs/common';
import { CreateDesfechocriancaexpostahivDto } from './dto/create-desfechocriancaexpostahiv.dto';
import { UpdateDesfechocriancaexpostahivDto } from './dto/update-desfechocriancaexpostahiv.dto';
import { PrismaService } from 'src/database/prisma.service';
import { TenantService } from 'src/tenant/tenant/tenant.service';

@Injectable()
export class DesfechocriancaexpostahivService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly tenantService: TenantService;




  // Método para criar um novo registro
  async create(createDesfechocriancaexpostahivDto: CreateDesfechocriancaexpostahivDto) {
    // Verificar se já existe um registro com o mesmo 'no_filtro' usando findFirst
    const existingRecord = await this.prisma.tb_desfecho_criancaexposta_hiv.findFirst({
      where: {
        no_filtro: createDesfechocriancaexpostahivDto.no_filtro, // Verifica se o 'no_filtro' já existe
      },
    });

    // Se já existir, lançar um erro ou retornar uma mensagem de aviso
    if (existingRecord) {
      throw new Error('Já existe um registro com esse no_filtro.');
    }

    // Se não existir, criar o novo registro, sem passar 'id', pois o Prisma irá gerar automaticamente
    const newRecord = await this.prisma.tb_desfecho_criancaexposta_hiv.create({
      data: {
        ...createDesfechocriancaexpostahivDto, // Passa os dados do DTO, mas não inclua o 'id'
        // O Prisma gerencia o 'id' automaticamente
      },
    });

    // Retornar o novo registro ou um sucesso
    return newRecord;
  }

  // Método para obter todos os registros
  async findAll() {
    console.log(this.tenantService.hierarquia_acesso)
    return await this.prisma.tb_desfecho_criancaexposta_hiv.findMany();
  }

  // Método para encontrar um registro específico por id
  findOne(id: number) {
    return `This action returns a #${id} desfechocriancaexpostahiv`;
  }

  // Método para atualizar um registro
  update(id: number, updateDesfechocriancaexpostahivDto: UpdateDesfechocriancaexpostahivDto) {
    return `This action updates a #${id} desfechocriancaexpostahiv`;
  }

  // Método para remover um registro
  remove(id: number) {
    return `This action removes a #${id} desfechocriancaexpostahiv`;
  }
}
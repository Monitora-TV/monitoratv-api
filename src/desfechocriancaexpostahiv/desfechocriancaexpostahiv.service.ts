import { Inject, Injectable } from '@nestjs/common';
import { CreateDesfechocriancaexpostahivDto } from './dto/create-desfechocriancaexpostahiv.dto';
import { UpdateDesfechocriancaexpostahivDto } from './dto/update-desfechocriancaexpostahiv.dto';
import { PrismaService } from 'src/database/prisma.service';


// https://github.com/codethi/forum-api/blob/main/src/questions/questions.service.ts

@Injectable()
export class DesfechocriancaexpostahivService {
  @Inject()
  private readonly prisma: PrismaService;


  create(createDesfechocriancaexpostahivDto: CreateDesfechocriancaexpostahivDto) {
    return 'This action adds a new desfechocriancaexpostahiv';
  }

  async findAll() {
    return await this.prisma.tb_desfecho_criancaexposta_hiv.findMany({
      include: {
        tb_monitora_criancaexposta_hiv: true,
      },
    })
  }



  findOne(id: number) {
    return `This action returns a #${id} desfechocriancaexpostahiv`;
  }

  update(id: number, updateDesfechocriancaexpostahivDto: UpdateDesfechocriancaexpostahivDto) {
    return `This action updates a #${id} desfechocriancaexpostahiv`;
  }

  remove(id: number) {
    return `This action removes a #${id} desfechocriancaexpostahiv`;
  }
}

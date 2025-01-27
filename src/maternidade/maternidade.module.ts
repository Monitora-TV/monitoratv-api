import { Module } from '@nestjs/common';
import { MaternidadeService } from './maternidade.service';
import { MaternidadeController } from './maternidade.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [MaternidadeController],
  providers: [MaternidadeService, PrismaService],
})
export class MaternidadeModule {}

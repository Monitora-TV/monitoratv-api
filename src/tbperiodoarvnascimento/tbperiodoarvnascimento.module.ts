import { Module } from '@nestjs/common';
import { TbperiodoarvnascimentoService } from './tbperiodoarvnascimento.service';
import { TbperiodoarvnascimentoController } from './tbperiodoarvnascimento.controller';
import { PrismaService } from 'src/database/prisma.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule], // Importa o módulo do banco de dados
  controllers: [TbperiodoarvnascimentoController],
  providers: [TbperiodoarvnascimentoService, PrismaService],
})
export class TbperiodoarvnascimentoModule {}

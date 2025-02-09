import { Module } from '@nestjs/common';
import { TbexamehivelisaibService } from './tbexamehivelisaib.service';
import { TbexamehivelisaibController } from './tbexamehivelisaib.controller';
import { UsuariologService } from 'src/usuariolog/usuariolog.service'; // Importando o serviço de logs
import { PrismaService } from 'src/database/prisma.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [ DatabaseModule ], // Importa o módulo do banco de dados
  controllers: [ TbexamehivelisaibController ] ,
  providers: [ TbexamehivelisaibService, UsuariologService, PrismaService],
})
export class TbexamehivelisaibModule {}



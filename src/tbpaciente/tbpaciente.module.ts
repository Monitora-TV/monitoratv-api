import { Module } from '@nestjs/common';
import { TbpacienteService } from './tbpaciente.service';
import { TbpacienteController } from './tbpaciente.controller';
import { UsuariologService } from 'src/usuariolog/usuariolog.service';
import { PrismaService } from 'src/database/prisma.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule], // Importa o módulo do banco de dados
  controllers: [TbpacienteController],
  providers: [TbpacienteService, UsuariologService, PrismaService],
})
export class TbpacienteModule {}

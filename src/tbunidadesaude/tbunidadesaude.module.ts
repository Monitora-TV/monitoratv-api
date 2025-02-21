import { Module } from '@nestjs/common';
import { TbunidadesaudeService } from './tbunidadesaude.service';
import { TbunidadesaudeController } from './tbunidadesaude.controller';
import { UsuariologService } from 'src/usuariolog/usuariolog.service';
import { PrismaService } from 'src/database/prisma.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule], // Importa o módulo do banco de dados
  controllers: [TbunidadesaudeController],
  providers: [TbunidadesaudeService, UsuariologService, PrismaService],
})
export class TbunidadesaudeModule {}

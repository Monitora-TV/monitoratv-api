import { Module } from '@nestjs/common';
import { TbcargaviralService } from './tbcargaviral.service';
import { TbcargaviralController } from './tbcargaviral.controller';
import { UsuariologService } from 'src/usuariolog/usuariolog.service';
import { PrismaService } from 'src/database/prisma.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule], // Importa o módulo do banco de dados
  controllers: [TbcargaviralController],
  providers: [TbcargaviralService, UsuariologService, PrismaService],
})
export class TbcargaviralModule {}

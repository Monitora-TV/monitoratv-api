import { Module } from '@nestjs/common';
import { CriancaexpostahivService } from './criancaexpostahiv.service';
import { UsuariologService } from 'src/usuariolog/usuariolog.service'; // Importando o serviço de logs

import { CriancaexpostahivController } from './criancaexpostahiv.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [CriancaexpostahivController],
  providers: [CriancaexpostahivService, UsuariologService,PrismaService],
})
export class CriancaexpostahivModule {}

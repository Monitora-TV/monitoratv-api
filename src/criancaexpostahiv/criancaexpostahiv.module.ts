import { Module } from '@nestjs/common';
import { CriancaexpostahivService } from './criancaexpostahiv.service';
import { CriancaexpostahivController } from './criancaexpostahiv.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CriancaexpostahivController],
  providers: [CriancaexpostahivService, PrismaService],
})
export class CriancaexpostahivModule {}

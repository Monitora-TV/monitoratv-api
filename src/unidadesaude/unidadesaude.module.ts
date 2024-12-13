import { Module } from '@nestjs/common';
import { UnidadesaudeService } from './unidadesaude.service';
import { UnidadesaudeController } from './unidadesaude.controller';
import { PrismaService } from 'src/database/prisma.service';


@Module({
  controllers: [UnidadesaudeController],
  providers: [UnidadesaudeService, PrismaService],
})
export class UnidadesaudeModule {}

import { Module } from '@nestjs/common';
import { UnidadesaudesaeService } from './unidadesaudesae.service';
import { UnidadesaudesaeController } from './unidadesaudesae.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [UnidadesaudesaeController],
  providers: [UnidadesaudesaeService, PrismaService],
})
export class UnidadesaudesaeModule {}

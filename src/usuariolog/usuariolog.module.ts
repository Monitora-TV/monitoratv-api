import { Module } from '@nestjs/common';
import { UsuariologService } from './usuariolog.service';
import { UsuariologController } from './usuariolog.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [UsuariologController],
  providers: [UsuariologService, PrismaService],
})
export class UsuariologModule {}


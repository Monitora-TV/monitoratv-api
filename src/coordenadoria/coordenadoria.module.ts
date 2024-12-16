import { Module } from '@nestjs/common';
import { CoordenadoriaService } from './coordenadoria.service';
import { CoordenadoriaController } from './coordenadoria.controller';

@Module({
  controllers: [CoordenadoriaController],
  providers: [CoordenadoriaService],
})
export class CoordenadoriaModule {}

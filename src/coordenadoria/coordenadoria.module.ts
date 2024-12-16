import { Module } from '@nestjs/common';
import { CoordenadoriaService } from './coordenadoria.service';
import { CoordenadoriaController } from './coordenadoria.controller';
import { DatabaseModule } from 'src/database/database.module'; // Conexão com o banco de dados


@Module({
  imports: [DatabaseModule], // Importa o módulo do banco de dados
  controllers: [CoordenadoriaController],
  providers: [CoordenadoriaService],
})
export class CoordenadoriaModule {}

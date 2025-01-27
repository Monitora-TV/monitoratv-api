import { Module } from '@nestjs/common';
import { AlertacriancaexpostahivService } from './alertacriancaexpostahiv.service';
import { AlertacriancaexpostahivController } from './alertacriancaexpostahiv.controller';
import { DatabaseModule } from 'src/database/database.module'; // Conexão com o banco de dados

@Module({
  imports: [DatabaseModule], // Importa o módulo do banco de dados
  controllers: [AlertacriancaexpostahivController],
  providers: [AlertacriancaexpostahivService],
})
export class AlertacriancaexpostahivModule {}





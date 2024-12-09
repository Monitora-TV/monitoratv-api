import { Module } from '@nestjs/common';
import { DesfechocriancaexpostahivService } from './desfechocriancaexpostahiv.service';
import { DesfechocriancaexpostahivController } from './desfechocriancaexpostahiv.controller';
import { DatabaseModule } from 'src/database/database.module'; // Conexão com o banco de dados

@Module({
  imports: [DatabaseModule], // Importa o módulo do banco de dados
  controllers: [DesfechocriancaexpostahivController], // Define os controladores
  providers: [DesfechocriancaexpostahivService], // Define os provedores de serviços
})
export class DesfechocriancaexpostahivModule {}

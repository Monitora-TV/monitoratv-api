import { Module } from '@nestjs/common';
import { TbexamehivelisaibService } from './tbexamehivelisaib.service';
import { TbexamehivelisaibController } from './tbexamehivelisaib.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule], // Importa o módulo do banco de dados
  controllers: [TbexamehivelisaibController],
  providers: [TbexamehivelisaibService],
})
export class TbexamehivelisaibModule {}


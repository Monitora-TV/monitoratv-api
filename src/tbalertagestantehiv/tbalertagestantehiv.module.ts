import { Module } from '@nestjs/common';
import { TbalertagestantehivService } from './tbalertagestantehiv.service';
import { TbalertagestantehivController } from './tbalertagestantehiv.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule], // Importa o módulo do banco de dados
  controllers: [TbalertagestantehivController],
  providers: [TbalertagestantehivService],
})
export class TbalertagestantehivModule {}


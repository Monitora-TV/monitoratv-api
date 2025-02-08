import { Module } from '@nestjs/common';
import { TbdesfechogestantehivService } from './tbdesfechogestantehiv.service';
import { TbdesfechogestantehivController } from './tbdesfechogestantehiv.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule], // Importa o módulo do banco de dados
  controllers: [TbdesfechogestantehivController],
  providers: [TbdesfechogestantehivService],
})
export class TbdesfechogestantehivModule {}


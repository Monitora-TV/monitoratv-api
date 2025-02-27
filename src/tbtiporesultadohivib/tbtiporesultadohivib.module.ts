import { Module } from '@nestjs/common';
import { TbtiporesultadohivibService } from './tbtiporesultadohivib.service';
import { TbtiporesultadohivibController } from './tbtiporesultadohivib.controller';
import { PrismaService } from 'src/database/prisma.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule], // Importa o módulo do banco de dados
  controllers: [TbtiporesultadohivibController],
  providers: [TbtiporesultadohivibService, PrismaService],
})
export class TbtiporesultadohivibModule {}

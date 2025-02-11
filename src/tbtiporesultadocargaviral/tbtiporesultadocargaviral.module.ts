import { Module } from '@nestjs/common';
import { TbtiporesultadocargaviralService } from './tbtiporesultadocargaviral.service';
import { TbtiporesultadocargaviralController } from './tbtiporesultadocargaviral.controller';
import { UsuariologService } from 'src/usuariolog/usuariolog.service'; // Importando o serviço de logs
import { PrismaService } from 'src/database/prisma.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule], // Importa o módulo do banco de dados
  controllers: [TbtiporesultadocargaviralController],
  providers: [TbtiporesultadocargaviralService, UsuariologService, PrismaService],
})
export class TbtiporesultadocargaviralModule {}


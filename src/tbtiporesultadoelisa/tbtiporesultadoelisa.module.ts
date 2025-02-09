import { Module } from '@nestjs/common';
import { TbtiporesultadoelisaService } from './tbtiporesultadoelisa.service';
import { TbtiporesultadoelisaController } from './tbtiporesultadoelisa.controller';
import { UsuariologService } from 'src/usuariolog/usuariolog.service'; // Importando o serviço de logs
import { PrismaService } from 'src/database/prisma.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule], // Importa o módulo do banco de dados
  controllers: [TbtiporesultadoelisaController],
  providers: [TbtiporesultadoelisaService, UsuariologService, PrismaService],
})
export class TbtiporesultadoelisaModule {}



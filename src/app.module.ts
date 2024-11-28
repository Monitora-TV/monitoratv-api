import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { PrismaModule } from './prisma/prisma.module';
import { CriancaexpostahivModule } from './criancaexpostahiv/criancaexpostahiv.module';
import { PrismaService } from './prisma/prisma.service';
import { DesfechocriancaexpostahivModule } from './desfechocriancaexpostahiv/desfechocriancaexpostahiv.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,  // Torna as variáveis acessíveis globalmente
    }),
    AuthenticationModule,
    PrismaModule,
    CriancaexpostahivModule,
    DesfechocriancaexpostahivModule,
    ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

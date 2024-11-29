import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { CriancaexpostahivModule } from './criancaexpostahiv/criancaexpostahiv.module';
import { PrismaService } from './database/prisma.service';
import { DesfechocriancaexpostahivModule } from './desfechocriancaexpostahiv/desfechocriancaexpostahiv.module';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,  // Torna as variáveis acessíveis globalmente
    }),
    AuthenticationModule,
    DatabaseModule,
    CriancaexpostahivModule,
    DesfechocriancaexpostahivModule,
    DatabaseModule,
    ProductModule,
    ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}





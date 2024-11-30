import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleNest } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CriancaexpostahivModule } from './criancaexpostahiv/criancaexpostahiv.module';
import { PrismaService } from './database/prisma.service';
import { DesfechocriancaexpostahivModule } from './desfechocriancaexpostahiv/desfechocriancaexpostahiv.module';
import { DatabaseModule } from './database/database.module';


import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard, KeycloakConnectModule,
  ResourceGuard,
  RoleGuard
} from 'nest-keycloak-connect';
import { ConfigModule } from './config/config.module';
import { KeycloakConfigService } from './config/keycloak-config.service';
import { ProductModule } from './product/product.module';


@Module({
  imports: [ ConfigModuleNest.forRoot({
    isGlobal: true,  // Torna as variáveis acessíveis globalmente
    }),
    AuthModule,
    HttpModule,
    DatabaseModule,
    CriancaexpostahivModule,
    DesfechocriancaexpostahivModule,
    DatabaseModule,
    ProductModule,
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [ConfigModule]
    }),
    ],
  controllers: [AppController],
  providers: [AppService, PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },    
  ],
})
export class AppModule {}

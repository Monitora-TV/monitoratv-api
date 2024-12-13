import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './database/prisma.service';
import { CriancaexpostahivModule } from './criancaexpostahiv/criancaexpostahiv.module';
import { DesfechocriancaexpostahivModule } from './desfechocriancaexpostahiv/desfechocriancaexpostahiv.module';
import { DatabaseModule } from './database/database.module';
import { TenantModule } from './tenant/tenant.module';
import { AuthMiddleware } from './middleware/auth.middleware';  // Importe o AuthMiddleware
import { UnidadesaudeModule } from './unidadesaude/unidadesaude.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    DesfechocriancaexpostahivModule,
    CriancaexpostahivModule,
    TenantModule,
    UnidadesaudeModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Registre o middleware para todas as rotas ou para rotas específicas
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');  // Aplica o middleware em todas as rotas ou você pode definir rotas específicas aqui
  }
}

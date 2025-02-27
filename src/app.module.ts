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
import { CoordenadoriaModule } from './coordenadoria/coordenadoria.module';
import { AlertacriancaexpostahivModule } from './alertacriancaexpostahiv/alertacriancaexpostahiv.module';
import { UnidadesaudesaeModule } from './unidadesaudesae/unidadesaudesae.module';
import { MaternidadeModule } from './maternidade/maternidade.module';
import { UsuarioModule } from './usuario/usuario.module';
import { UsuariologModule } from './usuariolog/usuariolog.module';
import { TbalertagestantehivModule } from './tbalertagestantehiv/tbalertagestantehiv.module';
import { TbdesfechogestantehivModule } from './tbdesfechogestantehiv/tbdesfechogestantehiv.module';
import { TbexamehivelisaibModule } from './tbexamehivelisaib/tbexamehivelisaib.module';
import { TbtiporesultadoelisaModule } from './tbtiporesultadoelisa/tbtiporesultadoelisa.module';
import { TbtiporesultadocargaviralModule } from './tbtiporesultadocargaviral/tbtiporesultadocargaviral.module';
import { TbcargaviralModule } from './tbcargaviral/tbcargaviral.module';
import { TbpacienteModule } from './tbpaciente/tbpaciente.module';
import { TbunidadesaudeModule } from './tbunidadesaude/tbunidadesaude.module';
import { TbperiodoarvnascimentoModule } from './tbperiodoarvnascimento/tbperiodoarvnascimento.module';
import { TbtiporesultadohivibModule } from './tbtiporesultadohivib/tbtiporesultadohivib.module';

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
    UnidadesaudeModule,
    CoordenadoriaModule,
    AlertacriancaexpostahivModule,
    UnidadesaudesaeModule,
    MaternidadeModule,
    UsuarioModule,
    UsuariologModule,
    TbalertagestantehivModule,
    TbdesfechogestantehivModule,
    TbexamehivelisaibModule,
    TbtiporesultadoelisaModule,
    TbtiporesultadocargaviralModule,
    TbcargaviralModule,
    TbpacienteModule,
    TbunidadesaudeModule,
    TbperiodoarvnascimentoModule,
    TbtiporesultadohivibModule
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

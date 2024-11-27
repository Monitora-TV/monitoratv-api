import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,  // Torna as variáveis acessíveis globalmente
    }),
    AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

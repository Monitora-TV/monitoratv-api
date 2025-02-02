import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createDecodeAccessToken } from "./oidc";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { decodeAccessToken } = await createDecodeAccessToken();


  // Habilitando CORS
  app.enableCors({
    origin: '*', // Ou defina o domínio específico para onde você quer permitir o CORS
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Habilitando as validações de entrada, de acordo com os DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Configuração do Swagger (OpenAPI)
  const config = new DocumentBuilder()
    .setTitle('Monitoramento da Transmissao Vertical HIV API')
    .setDescription('API para gerenciamento do Monitoramento da Transmissao Vertical ao HIV')
    .setVersion('1.0')
    .addBearerAuth() // Adicionando autenticação JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document); // A documentação estará disponível em /doc

  // Iniciando o servidor
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);
  console.log(`Server running on http://localhost:${port}`);
}

bootstrap();

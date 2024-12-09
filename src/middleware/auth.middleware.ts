// src/middleware/auth.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'; // Biblioteca para decodificar JWT
import { ConfigService } from '@nestjs/config'; // Para acessar variáveis de ambiente

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Extrair o token do cabeçalho de autorização
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token não encontrado');
    }

    try {
      // Decodificar o token JWT usando a chave secreta
      const decoded = jwt.verify(token, this.configService.get<string>('JWT_SECRET'));

      // Adicionar o usuário à requisição
      req.user = decoded;

      next();
    } catch (err) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}

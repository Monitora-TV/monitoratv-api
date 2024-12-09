// src/@types/express.d.ts
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any;  // Aqui 'any' pode ser substituído por um tipo mais específico, se necessário
    }
  }
}

// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy/jwt-strategy.service';
import { UserContextService } from './user-context/user-context.service';
import { UserContextGuard } from './guards/user-context.guard';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // registra o 'jwt' para AuthGuard
  ],
  providers: [JwtStrategy, UserContextService, UserContextGuard],
  exports: [UserContextService, UserContextGuard, PassportModule],
})
export class AuthModule {}

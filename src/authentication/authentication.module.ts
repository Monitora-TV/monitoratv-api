import { HttpModule  } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { AUTHENTICATION_STRATEGY_TOKEN } from './authentication.strategy';
import { KeycloakAuthenticationStrategy } from './strategy/keycloak.strategy';

@Module({
    imports: [
        HttpModule,
    ],
    providers: [
        AuthenticationGuard,
        AuthenticationService,
        {
            provide: AUTHENTICATION_STRATEGY_TOKEN,
            useClass: KeycloakAuthenticationStrategy, // <-- No more test-related code
        },
    ],
    exports: [
        AuthenticationService,
    ],
})
export class AuthenticationModule {}


/*
import { HttpModule  } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';
import { AUTHENTICATION_STRATEGY_TOKEN } from './authentication.strategy';
import { KeycloakAuthenticationStrategy } from './strategy/keycloak.strategy';
import { FakeAuthenticationStrategy } from './strategy/fake.strategy';

@Module({
    imports: [
        HttpModule,
    ],
    providers: [
        AuthenticationGuard,
        AuthenticationService,
        {
            provide: AUTHENTICATION_STRATEGY_TOKEN,
            useClass: process.env.NODE_ENV === 'test' ? FakeAuthenticationStrategy : KeycloakAuthenticationStrategy,
        },
    ],
    exports: [
        AuthenticationService,
    ],
})
export class AuthenticationModule {}
*/
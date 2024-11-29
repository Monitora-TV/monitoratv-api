import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: 'https://keycloak.gustavokanashiro.com/auth',
      realm: 'monitoratv',
      clientId: 'localhost-dev',
      secret: 'BA2jTN57m4UCHbNl5D9VXpEeROg8HLGK',
    };
  }
}



/*
KEYCLOAK_BASE_URL=https://keycloak.gustavokanashiro.com/auth
KEYCLOAK_REALM=monitoratv
KEYCLOAK_CLIENT_ID=localhost-backend
OIDC_ISSUER=https://keycloak.gustavokanashiro.com/auth/realms/monitoratv
*/

// https://keycloak.gustavokanashiro.com/auth/realms/monitoratv
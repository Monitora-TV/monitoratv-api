import { Injectable } from '@nestjs/common';
import { KeycloakConnectOptions, KeycloakConnectOptionsFactory, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';

@Injectable()
export class KeycloakConfigService implements KeycloakConnectOptionsFactory {

  createKeycloakConnectOptions(): KeycloakConnectOptions {
    return {
      authServerUrl: 'https://keycloak.gustavokanashiro.com/auth',
      realm: 'monitoratv',
      clientId: 'localhost-backend',
      secret: 'Ni9HaVdGjkqm9hpkbqJ4PAEnnG94t3wb',
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
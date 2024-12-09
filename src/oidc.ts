// src/oidc.ts
import { createOidcBackend } from 'oidc-spa/backend';
import { z } from 'zod';
import { UnauthorizedException } from '@nestjs/common'; // ou qualquer exceção que você prefira

export async function createDecodeAccessToken() {
  const oidcIssuerUri = process.env.OIDC_ISSUER;
  if (!oidcIssuerUri) {
    throw new Error("OIDC_ISSUER must be defined in the environment variables");
  }

  const { verifyAndDecodeAccessToken } = await createOidcBackend({
    issuerUri: oidcIssuerUri,
    decodedAccessTokenSchema: z.object({
      sub: z.string(),
      preferred_username: z.string(),
      name: z.string(),
      email: z.string(),
    }),
  });

  function decodeAccessToken(authorizationHeaderValue: string | undefined) {
    if (!authorizationHeaderValue) {
      throw new UnauthorizedException('Authorization header is required');
    }

    const result = verifyAndDecodeAccessToken({
      accessToken: authorizationHeaderValue.replace(/^Bearer /, ''),
    });

    if (!result.isValid) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return result.decodedAccessToken;
  }

  return { decodeAccessToken };
}

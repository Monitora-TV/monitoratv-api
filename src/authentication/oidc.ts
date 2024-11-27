import { createOidcBackend } from "oidc-spa/backend";
import { z } from "zod";
//import { HTTPException } from "hono/http-exception";
import { HttpException, HttpStatus } from '@nestjs/common';


export async function createDecodeAccessToken() {

    const oidcIssuerUri = process.env.OIDC_ISSUER

    console.log(`OIDC_ISSUER: ${oidcIssuerUri}`);

    if (oidcIssuerUri === undefined) {
        throw new Error("OIDC_ISSUER must be defined in the environment variables")
    }

    const { verifyAndDecodeAccessToken } = await createOidcBackend({ 
        issuerUri: oidcIssuerUri,
        decodedAccessTokenSchema: z.object({
            sub: z.string(),
            preferred_username: z.string(),
            name: z.string(),
            email: z.string(),
            //groups: z.array(z.string()), // Alteração aqui: agora é um array de strings
        
        })
    });

    function decodeAccessToken(params: { authorizationHeaderValue: string | undefined; }) {

        const { authorizationHeaderValue } = params;

        if( authorizationHeaderValue === undefined ){
            throw new HttpException('Authorization: Bearer <token> header missing', HttpStatus.UNAUTHORIZED);
            // throw new HTTPException(401);
        }

        const result = verifyAndDecodeAccessToken({ 
            accessToken: authorizationHeaderValue.replace(/^Bearer /, "") 
        });

        if( !result.isValid ){
            switch( result.errorCase ){
                case "does not respect schema":
                    throw new Error(`The access token does not respect the schema ${result.errorMessage}`);
                case "invalid signature":
                case "expired":
                    //throw new HTTPException(401);
                    throw new HttpException('Authorization: Bearer <token> header expired', HttpStatus.UNAUTHORIZED);
            }
        }

        return result.decodedAccessToken;

    }

    return { decodeAccessToken };

}
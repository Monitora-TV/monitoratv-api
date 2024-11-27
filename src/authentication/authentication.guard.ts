import { CanActivate, ExecutionContext, Header, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Request } from 'express';
import { createDecodeAccessToken } from "./oidc";


@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(
        private readonly authenticationService: AuthenticationService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();

        const header = request.header('Authorization');
        if (!header) {
            throw new HttpException('Authorization: Bearer <token> header missing', HttpStatus.UNAUTHORIZED);
        }

        const parts = header.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            throw new HttpException('Authorization: Bearer <token> header invalid', HttpStatus.UNAUTHORIZED);
        }

        const token = parts[1];

        try {
            // Store the user on the request object if we want to retrieve it from the controllers
            // request['user'] = await this.authenticationService.authenticate(token);
            request['user'] = await this.authenticationService.authenticate(header);
            
            return true;
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
            //throw new HttpException('asdfasdfa missing', HttpStatus.UNAUTHORIZED);            
        }
    }
}
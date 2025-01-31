import { Injectable } from '@nestjs/common';

@Injectable()
export class TenantService {
    cnes_vinculo: string;
    preferred_username: string;
    given_name: string;
    email: string;
    hierarquia_acesso: string;
}


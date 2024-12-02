import { Injectable } from '@nestjs/common';

@Injectable()
export class TenantService {
    cnes_vinculo: string;
    hierarquia_acesso: string;
}

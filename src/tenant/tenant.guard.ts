import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantService } from './tenant/tenant.service';

@Injectable()
export class TenantGuard implements CanActivate {

  constructor(private tenantService: TenantService){

  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const cnes_vinculo = request.user.cnes_vinculo;
    const hierarquia_acesso = request.user.hierarquia_acesso;

    this.tenantService.hierarquia_acesso = hierarquia_acesso;
    this.tenantService.cnes_vinculo = cnes_vinculo;

    return true;
  }
}

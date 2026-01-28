import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantService } from './tenant.service';

@Injectable()
export class TenantGuard implements CanActivate {

  constructor(private tenantService: TenantService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      return false;
    }

    /** Identidade */
    this.tenantService.user_id = user.sub;
    this.tenantService.username = user.preferred_username;
    this.tenantService.given_name = user.given_name;
    this.tenantService.email = user.email;

    /** Roles (realm roles) */
    this.tenantService.roles =
      user?.realm_access?.roles ?? [];

    /** CNES extraído dos groups */
    this.tenantService.cnes = Array.isArray(user.groups)
      ? user.groups
          .filter((g: string) => g.startsWith('/CNES/'))
          .map((g: string) => g.replace('/CNES/', ''))
      : [];

    return true;
  }
}

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserContextService, HierarquiaAcesso } from '../user-context/user-context.service';

@Injectable()
export class UserContextGuard implements CanActivate {
  constructor(private readonly userContext: UserContextService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuário não autenticado');
    }

    const roles: string[] = user.realm_access?.roles ?? [];
    const groups: string[] = user.groups ?? [];

    // hierarquia principal
    const hierarquia = roles.find(r =>
      [
        'SMS',
        'coordenadoria_regional',
        'supervisao_tecnica',
        'supervisao_uvis',
        'UBS',
      ].includes(r),
    ) as HierarquiaAcesso | undefined;

    if (!hierarquia) {
      throw new ForbiddenException('Hierarquia de acesso não definida');
    }

    const cnes = groups
      .filter(g => g.startsWith('/CNES/'))
      .map(g => g.split('/').pop()!);

    if (hierarquia !== 'SMS' && cnes.length === 0) {
      throw new ForbiddenException('CNES não vinculado ao usuário');
    }

    // popula contexto (fonte oficial)
    this.userContext.userId = user.sub;
    this.userContext.username = user.preferred_username;
    this.userContext.nome = user.given_name;
    this.userContext.email = user.email;
    this.userContext.roles = roles;
    this.userContext.hierarquia = hierarquia;
    this.userContext.cnes = hierarquia === 'SMS' ? null : cnes;

    request.userContext = this.userContext;
    return true;
  }
}

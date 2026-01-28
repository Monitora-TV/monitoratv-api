import { Injectable, Scope } from '@nestjs/common';

export type HierarquiaAcesso =
  | 'SMS'
  | 'coordenadoria_regional'
  | 'supervisao_tecnica'
  | 'supervisao_uvis'
  | 'UBS';

@Injectable({ scope: Scope.REQUEST })
export class UserContextService {
  // identidade
  userId?: string;
  username?: string;
  nome?: string;
  email?: string;

  // acesso
  hierarquia?: HierarquiaAcesso;
  roles?: string[];

  // escopo
  cnes?: string[] | null; // null = acesso global (SMS)
}

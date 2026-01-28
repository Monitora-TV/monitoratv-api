import { Injectable } from '@nestjs/common';

@Injectable()
export class TenantService {
  /** Identidade */
  user_id: string;                // sub
  username: string;               // preferred_username
  given_name?: string;
  email?: string;

  /** Autorização */
  roles: string[] = [];            // ['ADMIN', 'SMS']
  cnes: string[] = [];             // ['1010203', '2022331']

  /** Conveniência */
  get isAdmin(): boolean {
    return this.roles.includes('ADMIN');
  }

  get isSMS(): boolean {
    return this.roles.includes('SMS');
  }

  hasCnes(cnes: string): boolean {
    return this.cnes.includes(cnes);
  }

  /** Utilitário para debug */
  clear() {
    this.user_id = null;
    this.username = null;
    this.given_name = null;
    this.email = null;
    this.roles = [];
    this.cnes = [];
  }
}

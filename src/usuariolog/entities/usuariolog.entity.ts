import { tb_usuario_log } from '@prisma/client';

export class Usuariolog implements tb_usuario_log {
  id: number;
  userid_keycloak: string;
  username: string;
  tipo_operacao: string;
  entity: string;
  entityid: number;
  detalhe: string;
  dt_operacao: Date | null; // Tipo Date (pode ser nulo)
  tb_usuario: any;         // Relacionamento com tb_unidade_saude (unidade_monitoramento)
}


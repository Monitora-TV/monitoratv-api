import { tb_usuario } from '@prisma/client';

export class Usuario implements tb_usuario {
  id: number;
  nome: string;
  username: string;
  email: string;
  hierarquia_acesso: string;
  cnes_vinculo: string;
  id_unidade_vinculo: number;
  dt_ultimo_acesso: Date | null; // Tipo Date (pode ser nulo)
  dt_primeiro_acesso: Date | null;      // Tipo Date (pode ser nulo)
  tb_unidade_saude: any;         // Relacionamento com tb_unidade_saude (unidade_monitoramento)
}

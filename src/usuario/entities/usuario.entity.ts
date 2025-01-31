import { tb_usuario  } from '@prisma/client';

export class Usuario implements tb_usuario {
  id: number;
  nome: string;
  username: string;
  email: string;
  hierarquia_acesso: string;
  cnes_vinculo: string;
  dt_ultimo_acesso: Date;
  dt_cadastro: Date;
}


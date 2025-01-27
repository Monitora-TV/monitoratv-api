import { tb_maternidade } from '@prisma/client';

export class Maternidade implements tb_maternidade {
  id: number;
  id_coordenadoria: number;
  id_supervisao: number;
  id_unidade_saude: number;
  cnes_maternidade: string;
  no_maternidade: string;
  // Relacionamentos
  tb_coordenadoria: any;
  tb_supervisao: any;
  tb_unidade_saude: any;
}

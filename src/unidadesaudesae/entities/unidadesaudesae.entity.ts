import { tb_unidade_saude_sae } from '@prisma/client';

export class Unidadesaudesae implements tb_unidade_saude_sae {
  id: number;
  id_unidade_saude: number;
  id_coordenadoria: number;
  id_supervisao: number;
  id_uvis: number;
  cnes_sae: string;
  no_sae: string;
  // Relacionamentos
  tb_coordenadoria: any;
  tb_supervisao: any;
  tb_unidade_saude: any; // Relacionamento com tb_unidade_saude (unidade_monitoramento)
  tb_uvis: any;
}


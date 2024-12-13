import { tb_unidade_saude } from '@prisma/client';

export class Unidadesaude implements tb_unidade_saude {
  id: number;
  id_coordenadoria: number;
  id_supervisao: number;
  id_uvis: number;
  cnes_unidade: string;
  no_unidade: string;
  no_logradouro: string;
  nu_endereco: string;
  co_cep: string;
  co_sigla_estado: string;
  co_municipio_gestor: string;
  co_tipo_estabelecimento: string;
  no_unidade_limpo: string;
  
  tb_coordenadoria_to_unidade_saude: tb_unidade_saude[];
  tb_laboratorio: tb_unidade_saude[];
  tb_maternidade: tb_unidade_saude[];
  tb_matrix_exame_hiv: tb_unidade_saude[];
  tb_criancaexposta_hiv_maternidade: tb_unidade_saude[];
  tb_criancaexposta_hiv_monitoramento: tb_unidade_saude[];
  tb_gestante_hiv_maternidade_parto: tb_unidade_saude[];
  tb_gestante_hiv_uniacolh_prenatal: tb_unidade_saude[];
  tb_gestante_hiv_unicns_puerpera: tb_unidade_saude[];
  tb_gestante_hiv_unimonitoramento: tb_unidade_saude[];
  tb_supervisao: tb_unidade_saude[];
  tb_coordenadoria: tb_unidade_saude;
  tb_supervisao_to_unidade_saude: tb_unidade_saude;
  tb_uvis: tb_unidade_saude;
  tb_unidade_saude_matrix: tb_unidade_saude[];
  tb_unidade_saude_sae: tb_unidade_saude[];
  tb_unidade_saude_servclass: tb_unidade_saude[];
  tb_unidade_saude_siga: tb_unidade_saude[];
  tb_unidade_saude_sinan: tb_unidade_saude[];
  tb_unidade_saude_siscel: tb_unidade_saude[];
  tb_usuario: tb_unidade_saude[];
  tb_uvis_to_unidade_saude: tb_unidade_saude[];
}

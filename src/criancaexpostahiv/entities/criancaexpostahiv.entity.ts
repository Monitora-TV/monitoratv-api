import { tb_monitora_criancaexposta_hiv } from '@prisma/client';

export class Criancaexpostahiv implements tb_monitora_criancaexposta_hiv {
  id_exame_hiv_elisaib: number;
  id_carga_viral_primeira: number;
  id_carga_viral_penultima: number;
  id_carga_viral_ultima: number;
  id: number;
  id_paciente: number;
  id_monitora_gestante_hiv: number;
  id_sinan_notificacao: number;
  nu_notific_sinan: string;
  dt_notific_sinan: Date;
  id_unidade_notific_sinan: number;
  id_maternidade_nascimento: number;
  dt_saida_maternidade: Date;
  dt_inicio_monitoramento: Date;
  id_unidade_monitoramento: number;
  id_desfecho_criexp_hiv: number;
  dt_desfecho_criexp_hiv: Date;
  id_origem_desfecho: number;
  dt_diagnostico_hiv: Date;
  id_matrix_exame_hiv_diagnostico: number;
  matrix_exame_conclusao_diagnostico: string;
  id_tipo_resultado_elisa_diagnostico: number;
  id_tipo_resultado_hivib_diagnostico: number;
  flg_coleta_cv_nascimento: boolean;
  flg_arv_nascimento: boolean;
  id_arv_nascimento_periodo: number;
  id_tarv_esquema: number;
  flg_tarv_28_dias: boolean;
  id_matrix_exahiv_ultima_pos_12: number;
  id_matrix_exahiv_ultima_pos_18: number;
  id_matrix_exahiv_primeiro: number;
  dt_inicio_profilaxia: Date;
  id_origem_monitoramento: number;
  id_usuario: number;
  dt_atualizacao: Date;

  // Relacionamentos
  tb_desfecho_criancaexposta_hiv: any; // Relacionamento com tb_desfecho_criancaexposta_hiv
  tb_unidade_saude_maternidade: any; // Relacionamento com tb_unidade_saude (maternidade_nascimento)
  tb_origem_desfecho: any; // Relacionamento com tb_origem_cadastro (origem_desfecho)
  tb_origem_origem: any; // Relacionamento com tb_origem_cadastro (origem_monitoramento)
  tb_paciente: any; // Relacionamento com tb_paciente
  tb_sinan_notificacao: any; // Relacionamento com tb_sinan_notificacao
  tb_unidade_saude_monitoramento: any; // Relacionamento com tb_unidade_saude (unidade_monitoramento)
}

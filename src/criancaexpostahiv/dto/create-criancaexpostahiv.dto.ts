import { IsInt, IsOptional, IsBoolean, IsDateString, IsString, Length } from 'class-validator';

export class CreateCriancaexpostahivDto {
  
  @IsOptional()
  @IsInt()
  id_paciente: number;

  @IsOptional()
  @IsInt()
  id_monitora_gestante_hiv: number;

  @IsOptional()
  @IsInt()
  id_sinan_notificacao: number;

  @IsOptional()
  @IsString()
  @Length(1, 10)
  nu_notific_sinan: string;

  @IsOptional()
  @IsDateString()
  dt_notific_sinan: Date;

  @IsOptional()
  @IsInt()
  id_unidade_notific_sinan: number;

  @IsOptional()
  @IsInt()
  id_maternidade_nascimento: number;

  @IsOptional()
  @IsDateString()
  dt_saida_maternidade: Date;

  @IsOptional()
  @IsDateString()
  dt_inicio_monitoramento: Date;

  @IsOptional()
  @IsInt()
  id_unidade_monitoramento: number;

  @IsOptional()
  @IsInt()
  id_desfecho_criexp_hiv: number;

  @IsOptional()
  @IsDateString()
  dt_desfecho_criexp_hiv: Date;

  @IsOptional()
  @IsInt()
  id_origem_desfecho: number;

  @IsOptional()
  @IsDateString()
  dt_diagnostico_hiv: Date;

  @IsOptional()
  @IsInt()
  id_matrix_exame_hiv_diagnostico: number;

  @IsOptional()
  @IsString()
  @Length(1, 250)
  matrix_exame_conclusao_diagnostico: string;

  @IsOptional()
  @IsInt()
  id_tipo_resultado_elisa_diagnostico: number;

  @IsOptional()
  @IsInt()
  id_tipo_resultado_hivib_diagnostico: number;

  @IsOptional()
  @IsBoolean()
  flg_coleta_cv_nascimento: boolean;

  @IsOptional()
  @IsBoolean()
  flg_arv_nascimento: boolean;

  @IsOptional()
  @IsInt()
  id_arv_nascimento_periodo: number;

  @IsOptional()
  @IsInt()
  id_tarv_esquema: number;

  @IsOptional()
  @IsBoolean()
  flg_tarv_28_dias: boolean;

  @IsOptional()
  @IsInt()
  id_siscel_cv_primeira: number;

  @IsOptional()
  @IsInt()
  id_siscel_cv_penultima: number;

  @IsOptional()
  @IsInt()
  id_siscel_cv_ultima: number;

  @IsOptional()
  @IsInt()
  id_matrix_exahiv_ultima_pos_12: number;

  @IsOptional()
  @IsInt()
  id_matrix_exahiv_ultima_pos_18: number;

  @IsOptional()
  @IsInt()
  id_matrix_exahiv_primeiro: number;

  @IsOptional()
  @IsDateString()
  dt_inicio_profilaxia: Date;

  @IsOptional()
  @IsInt()
  id_origem_monitoramento: number;

  @IsOptional()
  @IsInt()
  id_usuario: number;

  @IsOptional()
  @IsDateString()
  dt_atualizacao: Date;
}

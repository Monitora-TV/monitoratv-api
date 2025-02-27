import { IsInt, IsString, IsBoolean, IsDateString, IsOptional, IsNotEmpty, Length } from 'class-validator';

export class CreateCriancaexpostahivDto {
      @IsNotEmpty()
      @IsInt()
      id_paciente: number;
  
      @IsOptional()
      @IsInt()
      id_monitora_gestante_hiv: number;
  
      @IsOptional()
      @IsInt()
      id_sinan_notificacao: number;
  
      @IsOptional()
      @Length(1)
      @IsString()
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
      @IsBoolean()
      flg_coleta_cv_nascimento: boolean;
  
      @IsOptional()
      @IsBoolean()
      flg_arv_nascimento: boolean;
  
      @IsOptional()
      @IsInt()
      id_periodo_arv_nascimento: number;
  
      @IsOptional()
      @IsBoolean()
      flg_tarv_28_dias: boolean;
  
      @IsOptional()
      @IsInt()
      id_carga_viral_primeira: number;
  
      @IsOptional()
      @IsInt()
      id_carga_viral_penultima: number;
  
      @IsOptional()
      @IsInt()
      id_carga_viral_ultima: number;
  
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
      @IsInt()
      id_examehivelisaib_diagnostico: number;
  
      @IsOptional()
      @IsInt()
      id_examehivelisaib_last_apos_12: number;
  
      @IsOptional()
      @IsInt()
      id_examehivelisaib_last_apos_18: number;
  
      @IsOptional()
      @IsInt()
      id_examehivelisaib_first: number;
  
      @IsOptional()
      @IsBoolean()
      flg_tarv_azt: boolean;
  
      @IsOptional()
      @IsBoolean()
      flg_tarv_3tc: boolean;
  
      @IsOptional()
      @IsBoolean()
      flg_tarv_nevirapina: boolean;
  
      @IsOptional()
      @IsBoolean()
      flg_tarv_raltegravir: boolean;
  
  }
  
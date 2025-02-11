import { IsInt, IsString, IsBoolean, IsDateString, IsOptional, IsNotEmpty, Length } from 'class-validator';

export class CreateTbcargaviralDto {
    @IsOptional()
    @IsInt()
    id_siscel_carga_viral: number;

    @IsOptional()
    @IsInt()
    id_paciente: number;

    @IsOptional()
    @IsInt()
    id_unidade_solicitante: number;

    @IsOptional()
    @IsInt()
    id_unidade_executora: number;

    @IsOptional()
    @Length(1)
    @IsString()
    codigo: string;

    @IsOptional()
    @IsInt()
    idade_paciente_coleta: number;

    @IsOptional()
    @Length(1)
    @IsString()
    nu_solicitacao: string;

    @IsOptional()
    @Length(1)
    @IsString()
    id_amostra: string;

    @IsOptional()
    @Length(1)
    @IsString()
    gestante: string;

    @IsOptional()
    @Length(1)
    @IsString()
    ds_idade_gestacional: string;

    @IsOptional()
    @IsInt()
    id_motivo_exame_solicitado: number;

    @IsOptional()
    @IsDateString()
    dt_solicitacao: Date;

    @IsOptional()
    @IsDateString()
    dt_recebimento: Date;

    @IsOptional()
    @Length(1)
    @IsString()
    copias: string;

    @IsOptional()
    @Length(1)
    @IsString()
    observacoes: string;

    @IsOptional()
    @IsDateString()
    dt_atualizacao: Date;

    @IsOptional()
    @IsInt()
    qt_copias: number;

    @IsOptional()
    @Length(1)
    @IsString()
    ds_resultado_carga_viral: string;

    @IsOptional()
    @IsInt()
    id_tipo_resultado_carga_viral: number;

}

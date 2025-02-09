import { IsInt, IsString, IsBoolean, IsDateString, IsOptional, IsNotEmpty, Length } from 'class-validator';

export class CreateTbexamehivelisaibDto {
    @IsOptional()
    @IsInt()
    id_paciente: number;

    @IsOptional()
    @IsInt()
    id_unidade_solicitante: number;

    @IsOptional()
    @IsInt()
    id_laboratorio: number;

    @IsOptional()
    @IsDateString()
    dt_cadastro_resultado: Date;

    @IsOptional()
    @Length(1)
    @IsString()
    numero_pedido: string;

    @IsOptional()
    @IsInt()
    id_tipo_resultado_elisa: number;

    @IsOptional()
    @IsInt()
    id_tipo_resultado_hivib: number;

    @IsOptional()
    @Length(1)
    @IsString()
    conclusao: string;

    @IsOptional()
    @Length(1)
    @IsString()
    prontuario: string;

    @IsOptional()
    @IsInt()
    id_paciente_matrix: number;

    @IsOptional()
    @IsInt()
    id_unidade_origem_matrix: number;

    @IsOptional()
    @IsDateString()
    dt_atualizacao: Date;

}

import { IsInt, IsString, IsBoolean, IsDateString, IsOptional, IsNotEmpty, Length } from 'class-validator';

export class CreateTbpacienteDto {
    @IsOptional()
    @IsOptional()
    @Length(10)
    @IsString()
    no_paciente: string;

    @IsOptional()
    @Length(10)
    @IsString()
    no_mae: string;

    @IsOptional()
    @Length(1)
    @IsString()
    no_pai: string;

    @IsOptional()
    @IsDateString()
    dt_nascimento: Date;

    @IsOptional()
    @Length(1)
    @IsString()
    cns_paciente: string;

    @IsOptional()
    @Length(1)
    @IsString()
    cns_mae: string;

    @IsOptional()
    @Length(1)
    @IsString()
    dnv: string;

    @IsOptional()
    @Length(1)
    @IsString()
    cpf: string;

    @IsOptional()
    @Length(1)
    @IsString()
    rg: string;

    @IsOptional()
    @Length(1)
    @IsString()
    sg_sexo: string;

    @IsOptional()
    @Length(1)
    @IsString()
    co_municipio_residencia: string;

    @IsOptional()
    @Length(1)
    @IsString()
    no_bairro: string;

    @IsOptional()
    @Length(1)
    @IsString()
    no_logradouro: string;

    @IsOptional()
    @Length(1)
    @IsString()
    nu_endereco: string;

    @IsOptional()
    @Length(1)
    @IsString()
    co_cep: string;

    @IsOptional()
    @IsBoolean()
    flg_gestante: boolean;

    @IsOptional()
    @IsBoolean()
    flg_crianca: boolean;

    @IsOptional()
    @IsInt()
    id_raca_cor: number;

    @IsOptional()
    @IsInt()
    id_situacao_familiar: number;

    @IsOptional()
    @IsInt()
    id_escolaridade: number;

    @IsOptional()
    @IsInt()
    id_origem_cadastro: number;

    @IsOptional()
    @IsDateString()
    dt_atualizacao: Date;

    @IsOptional()
    @IsInt()
    id_paciente_mae: number;
}

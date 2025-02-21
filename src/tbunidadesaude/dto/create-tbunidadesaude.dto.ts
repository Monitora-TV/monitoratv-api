import { IsInt, IsString, IsBoolean, IsDateString, IsOptional, IsNotEmpty, Length } from 'class-validator';

export class CreateTbunidadesaudeDto {
    @IsOptional()
    @IsInt()
    id_coordenadoria: number;

    @IsOptional()
    @IsInt()
    id_supervisao: number;

    @IsOptional()
    @IsInt()
    id_uvis: number;

    @IsOptional()
    @Length(1)
    @IsString()
    cnes_unidade: string;

    @IsOptional()
    @Length(1)
    @IsString()
    no_unidade: string;

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
    @Length(1)
    @IsString()
    co_sigla_estado: string;

    @IsOptional()
    @Length(1)
    @IsString()
    co_municipio_gestor: string;

    @IsOptional()
    @Length(1)
    @IsString()
    co_tipo_estabelecimento: string;

    @IsOptional()
    @Length(1)
    @IsString()
    no_unidade_limpo: string;

    @IsOptional()
    @IsBoolean()
    is_sae: boolean;

}

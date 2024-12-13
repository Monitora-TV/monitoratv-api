import { IsInt, IsOptional, IsString, Length, IsDateString, IsBoolean } from 'class-validator';

export class CreateUnidadesaudeDto {
  
  @IsOptional()
  @IsInt()
  id_coordenadoria?: number;  // Pode ser opcional, pois no modelo Prisma é opcional

  @IsOptional()
  @IsInt()
  id_supervisao?: number;  // Pode ser opcional

  @IsOptional()
  @IsInt()
  id_uvis?: number;  // Pode ser opcional

  @IsOptional()
  @IsString()
  @Length(1, 10)
  cnes_unidade?: string;  // Pode ser opcional e deve ter um tamanho de 1 a 10

  @IsOptional()
  @IsString()
  @Length(1, 100)
  no_unidade?: string;  // Pode ser opcional e deve ter um tamanho de 1 a 100

  @IsOptional()
  @IsString()
  @Length(1, 100)
  no_logradouro?: string;  // Pode ser opcional e deve ter um tamanho de 1 a 100

  @IsOptional()
  @IsString()
  @Length(1, 10)
  nu_endereco?: string;  // Pode ser opcional e deve ter um tamanho de 1 a 10

  @IsOptional()
  @IsString()
  @Length(1, 10)
  co_cep?: string;  // Pode ser opcional e deve ter um tamanho de 1 a 10

  @IsOptional()
  @IsString()
  @Length(1, 2)
  co_sigla_estado?: string;  // Pode ser opcional e deve ter um tamanho de 1 a 2

  @IsOptional()
  @IsString()
  @Length(1, 10)
  co_municipio_gestor?: string;  // Pode ser opcional e deve ter um tamanho de 1 a 10

  @IsOptional()
  @IsString()
  @Length(1, 3)
  co_tipo_estabelecimento?: string;  // Pode ser opcional e deve ter um tamanho de 1 a 3

  @IsOptional()
  @IsString()
  @Length(1, 100)
  no_unidade_limpo?: string;  // Pode ser opcional e deve ter um tamanho de 1 a 100

  // Adicione outras validações para as relações se necessário
}

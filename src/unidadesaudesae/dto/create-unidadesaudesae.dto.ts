import { IsInt, IsOptional, IsString, Length, IsDateString, IsBoolean } from 'class-validator';

export class CreateUnidadesaudesaeDto {
  
  @IsOptional()
  @IsInt()
  id_unidade_saude?: number;  // Pode ser opcional, pois no modelo Prisma é opcional

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
  cnes_sae?: string;  // Pode ser opcional e deve ter um tamanho de 1 a 10

  @IsOptional()
  @IsString()
  @Length(1, 100)
  no_sae?: string;  // Pode ser opcional e deve ter um tamanho de 1 a 100

  // Adicione outras validações para as relações se necessário
}

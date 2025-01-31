import { IsInt, IsOptional, IsString, Length, IsDateString, IsBoolean } from 'class-validator';

export class CreateUsuarioDto {
  
  @IsOptional()
  @IsString()
  @Length(1, 255)
  nome?: string;  // Pode ser opcional, pois no modelo Prisma é opcional

  @IsOptional()
  @IsString()
  @Length(1, 255)
  username?: string;  // Pode ser opcional, pois no modelo Prisma é opcional


  @IsOptional()
  @IsString()
  @Length(1, 255)
  email?: string;  // Pode ser opcional

  @IsOptional()
  @IsString()
  @Length(1, 50)
  hierarquia_acesso?: string;  // Pode ser opcional

  @IsOptional()
  @IsString()
  @Length(1, 20)
  cnes_vinculo?: string;  // Pode ser opcional e deve ter um tamanho de 1 a 10

  @IsOptional()
  @IsString()
  @Length(1, 10)
  dt_ultimo_acesso?: Date;  // Pode ser opcional e deve ter um tamanho de 1 a 100

  @IsOptional()
  @IsString()
  @Length(1, 10)
  dt_cadastro?: Date;  // Pode ser opcional e deve ter um tamanho de 1 a 100


  // Adicione outras validações para as relações se necessário
}

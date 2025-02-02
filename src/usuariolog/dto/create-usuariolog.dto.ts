import { IsInt, IsOptional, IsString, Length, IsDateString, IsBoolean } from 'class-validator';

export class CreateUsuariologDto {
    @IsString()
    @Length(1, 255)
    username: string;

    @IsOptional()
    @IsString()
    @Length(1, 20)
    tipo_operacao?: string;  // Pode ser opcional, pois no modelo Prisma é opcional

    @IsOptional()
    @IsString()
    @Length(1, 200)
    entity: string;  // Pode ser opcional, pois no modelo Prisma é opcional

    @IsOptional()
    @IsInt()
    entityId?: number;

    @IsOptional()
    @IsString()
    @Length(1, 255)
    detalhe?: string;  // Pode ser opcional

    @IsOptional()
    @IsString()
    @Length(1, 50)
    dt_operacao?: Date;  // Pode ser opcional e deve ter um tamanho de 1 a 100

}






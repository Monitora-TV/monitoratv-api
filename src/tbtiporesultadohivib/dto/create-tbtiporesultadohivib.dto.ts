import { IsString, IsOptional, IsNotEmpty, Length } from 'class-validator';

export class CreateTbtiporesultadohivibDto {
    @IsNotEmpty()
    @Length(1)
    @IsString()
    ds_resultado_hivib: string;

    @IsOptional()
    @Length(1)
    @IsString()
    no_filtro: string;

}

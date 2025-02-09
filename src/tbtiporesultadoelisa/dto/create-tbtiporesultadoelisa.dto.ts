import { IsInt, IsString, IsBoolean, IsDateString, IsOptional, IsNotEmpty, Length } from 'class-validator';

export class CreateTbtiporesultadoelisaDto {
    @IsOptional()
    @Length(1)
    @IsString()
    ds_resultado_elisa: string;

    @IsOptional()
    @Length(1)
    @IsString()
    no_filtro: string;

}


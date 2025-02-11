import { IsInt, IsString, IsBoolean, IsDateString, IsOptional, IsNotEmpty, Length } from 'class-validator';

export class CreateTbtiporesultadocargaviralDto {
    @IsNotEmpty()
    @Length(1)
    @IsString()
    no_tipo_resultado_carga_viral: string;

    @IsOptional()
    @Length(1)
    @IsString()
    no_filtro: string;

    @IsOptional()
    @IsBoolean()
    flg_carga_viral_detectavel: boolean;

}

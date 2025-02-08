import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateTbdesfechogestantehivDto {
    @Length(6)
    @IsString()
    @IsNotEmpty()
    no_desfecho_gestante_hiv: string;

    @Length(6)
    @IsString()
    @IsNotEmpty()
    no_filtro: string;

}


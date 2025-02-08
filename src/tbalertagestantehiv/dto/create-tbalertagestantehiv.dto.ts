import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateTbalertagestantehivDto {
    @Length(6)
    @IsString()
    @IsNotEmpty()
    no_alerta_gestante_hiv: string;
    
    @Length(6)
    @IsString()
    @IsNotEmpty()
    ds_alerta_reduzido_gestante_hiv: string;
}




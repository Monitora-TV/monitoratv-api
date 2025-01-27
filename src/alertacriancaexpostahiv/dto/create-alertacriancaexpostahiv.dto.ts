import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateAlertacriancaexpostahivDto {
    @Length(6)
    @IsString()
    @IsNotEmpty()
    no_alerta_criancaexposta_hiv: string;
  
    @Length(6)
    @IsString()
    @IsNotEmpty()
    ds_alerta_reduzido_criancaexposta_hiv: string;
  
}

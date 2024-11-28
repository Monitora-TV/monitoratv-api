import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateDesfechocriancaexpostahivDto {
    @Length(6)
    @IsString()
    @IsNotEmpty()
    no_desfecho_criancaexposta_hiv: string;
  
    @Length(6)
    @IsString()
    @IsNotEmpty()
    no_filtro: string;
  
}



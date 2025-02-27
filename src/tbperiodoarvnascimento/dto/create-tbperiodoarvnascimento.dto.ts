import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateTbperiodoarvnascimentoDto {
    @IsNotEmpty()
    @Length(1)
    @IsString()
    no_periodo_arv_nascimento: string;
}


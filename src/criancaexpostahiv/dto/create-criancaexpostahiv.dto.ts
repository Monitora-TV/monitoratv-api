import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCriancaexpostahivDto {
    @Length(6)
    @IsString()
    @IsNotEmpty()
    body: string;
     
}

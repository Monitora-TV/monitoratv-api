import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCoordenadoriaDto {
    @Length(7)
    @IsString()
    @IsNotEmpty()
    cnes_coordenadoria: string;
  
    @Length(6)
    @IsString()
    @IsNotEmpty()
    no_coordenadoria: string;
  
}

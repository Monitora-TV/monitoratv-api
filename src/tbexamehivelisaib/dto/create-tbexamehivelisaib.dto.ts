import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateTbexamehivelisaibDto {
    @IsNotEmpty()
    id_paciente: number;

    @IsNotEmpty()
    id_unidade_solicitante: number;

    @IsNotEmpty()
    id_laboratorio: number;

    @Length(6)
    @IsString()
    @IsNotEmpty()
    numero_pedido: string;

    @IsNotEmpty()
    id_tipo_resultado_elisa: number;

    @IsNotEmpty()
    id_tipo_resultado_hivib: number;

    @Length(6)
    @IsString()
    @IsNotEmpty()
    conclusao: string;

    @Length(6)
    @IsString()
    @IsNotEmpty()
    prontuario: string;

    @IsNotEmpty()
    id_paciente_matrix: number;

    @IsNotEmpty()
    id_unidade_origem_matrix: number;

}


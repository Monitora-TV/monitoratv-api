import { tb_exame_hiv_elisa_ib } from '@prisma/client';

export class Tbexamehivelisaib implements tb_exame_hiv_elisa_ib {
    id: number;
    id_paciente: number;
    id_unidade_solicitante: number;
    id_laboratorio: number;
    dt_cadastro_resultado: Date;
    numero_pedido: string;
    id_tipo_resultado_elisa: number;
    id_tipo_resultado_hivib: number;
    conclusao: string;
    prontuario: string;
    id_paciente_matrix: number;
    id_unidade_origem_matrix: number;
    dt_atualizacao: Date;
    tb_unidade_saude_solicitante: any;
    tb_unidade_saude_laboratorio: any;
}
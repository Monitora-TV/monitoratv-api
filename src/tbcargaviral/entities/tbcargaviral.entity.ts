import { tb_carga_viral } from '@prisma/client';

export class Tbcargaviral implements tb_carga_viral {
    id: number;
    id_siscel_carga_viral: number;
    id_paciente: number;
    id_unidade_solicitante: number;
    id_unidade_executora: number;
    codigo: string;
    idade_paciente_coleta: number;
    nu_solicitacao: string;
    id_amostra: string;
    gestante: string;
    ds_idade_gestacional: string;
    id_motivo_exame_solicitado: number;
    dt_solicitacao: Date;
    dt_recebimento: Date;
    copias: string;
    observacoes: string;
    dt_atualizacao: Date;
    qt_copias: number;
    ds_resultado_carga_viral: string;
    id_tipo_resultado_carga_viral: number;
}

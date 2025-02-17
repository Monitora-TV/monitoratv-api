import { tb_paciente } from '@prisma/client';

export class Tbpaciente implements tb_paciente {
    id: number;
    no_paciente: string;
    no_mae: string;
    no_pai: string;
    dt_nascimento: Date;
    cns_paciente: string;
    cns_mae: string;
    dnv: string;
    cpf: string;
    rg: string;
    sg_sexo: string;
    co_municipio_residencia: string;
    no_bairro: string;
    no_logradouro: string;
    nu_endereco: string;
    co_cep: string;
    flg_gestante: boolean;
    flg_crianca: boolean;
    id_raca_cor: number;
    id_situacao_familiar: number;
    id_escolaridade: number;
    id_origem_cadastro: number;
    dt_atualizacao: Date;
    id_paciente_mae: number;
    nome_filtro: string;
    primeiro_nome_filtro: string;
    ultimo_nome_filtro: string;
    primeiro_nome_soundex: string;
    ultimo_nome_soundex: string;
    nome_mae_filtro: string;
    primeiro_nome_mae_filtro: string;
    ultimo_nome_mae_filtro: string;
    primeiro_nome_mae_soundex: string;
    ultimo_nome_mae_soundex: string;
}

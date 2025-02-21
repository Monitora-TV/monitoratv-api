import { tb_unidade_saude } from '@prisma/client';

export class Tbunidadesaude implements tb_unidade_saude {
    id: number;
    id_coordenadoria: number;
    id_supervisao: number;
    id_uvis: number;
    cnes_unidade: string;
    no_unidade: string;
    no_logradouro: string;
    nu_endereco: string;
    co_cep: string;
    co_sigla_estado: string;
    co_municipio_gestor: string;
    co_tipo_estabelecimento: string;
    no_unidade_limpo: string;
    is_sae: boolean;
}

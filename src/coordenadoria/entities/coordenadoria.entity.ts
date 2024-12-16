import { tb_coordenadoria } from '@prisma/client';

export class Coordenadoria implements tb_coordenadoria {
    id: number;
    cnes_coordenadoria: string;
    no_coordenadoria: string;
    id_unidade_saude: number;
}



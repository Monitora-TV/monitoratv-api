import { tb_alerta_gestante_hiv } from '@prisma/client';

export class Tbalertagestantehiv implements tb_alerta_gestante_hiv {
    id: number;
    no_alerta_gestante_hiv: string;
    ds_alerta_reduzido_gestante_hiv: string;
}

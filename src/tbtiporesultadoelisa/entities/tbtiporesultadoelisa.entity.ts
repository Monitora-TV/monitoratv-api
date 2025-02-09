import { tb_tipo_resultado_elisa } from '@prisma/client';

export class Tbtiporesultadoelisa implements tb_tipo_resultado_elisa {
    id: number;
    ds_resultado_elisa: string;
    no_filtro: string;
}

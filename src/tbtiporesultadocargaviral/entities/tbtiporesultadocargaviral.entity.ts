import { tb_tipo_resultado_carga_viral } from '@prisma/client';

export class Tbtiporesultadocargaviral implements tb_tipo_resultado_carga_viral {
    id: number;
    no_tipo_resultado_carga_viral: string;
    no_filtro: string;
    flg_carga_viral_detectavel: boolean;
}

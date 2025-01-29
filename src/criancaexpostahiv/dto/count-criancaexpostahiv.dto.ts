// count-criancaexpostahiv.dto.ts
export class CountCriancaExpostaHivDesfechoGeral {
  ano_desfecho: string;
  id_desfecho_criexp_hiv: number;
  no_desfecho_criancaexposta_hiv: string;
  total: number;
}

export class CountCriancaExpostaHivDesfecho {
  ano_inicio_monitoramento: number;
  no_desfecho_criancaexposta_hiv: string;
  qt_monitoramento: number;
}




export class CountCriancaExpostaHivStatus {
  ano_inicio_monitoramento: string;
  no_desfecho_criancaexposta_hiv: string;
  qt_monitoramento: number;
}

export class CountCriancaExpostaHivAlerta {
  no_alerta: string;
  qt_monitoramento: number;
}




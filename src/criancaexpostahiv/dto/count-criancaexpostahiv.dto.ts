// count-criancaexpostahiv.dto.ts
export class CountCriancaExpostaHivDesfechoGeral {
  ano_desfecho: string;
  id_desfecho_criexp_hiv: number;
  no_desfecho_criancaexposta_hiv: string;
  total: number;
}

export class CountCriancaExpostaHivDesfecho {
  id_desfecho_criexp_hiv: number;  
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
  id_alerta_criancaexposta_hiv: number;  
  no_alerta: string;
  qt_monitoramento: number;
}




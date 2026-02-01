export function mapUpdateCriancaExpostaHivDtoToPrisma(
  dto: any,
) {
  const data: any = { ...dto };

  /**
   * Desfecho
   */
  if ('id_desfecho_criexp_hiv' in dto) {
    if (dto.id_desfecho_criexp_hiv === null) {
      data.tb_desfecho_criancaexposta_hiv = {
        disconnect: true,
      };
    } else {
      data.tb_desfecho_criancaexposta_hiv = {
        connect: { id: dto.id_desfecho_criexp_hiv },
      };
    }
    delete data.id_desfecho_criexp_hiv;
  }

  /**
   * Unidade de monitoramento
   */
  if ('id_unidade_monitoramento' in dto) {
    if (dto.id_unidade_monitoramento === null) {
      data.tb_unidade_monitoramento = { disconnect: true };
    } else {
      data.tb_unidade_monitoramento = {
        connect: { id: dto.id_unidade_monitoramento },
      };
    }
    delete data.id_unidade_monitoramento;
  }

  /**
   * Unidade SINAN
   */
  if ('id_unidade_notific_sinan' in dto) {
    if (dto.id_unidade_notific_sinan === null) {
      data.tb_unidade_notific_sinan = { disconnect: true };
    } else {
      data.tb_unidade_notific_sinan = {
        connect: { id: dto.id_unidade_notific_sinan },
      };
    }
    delete data.id_unidade_notific_sinan;
  }

  /**
   * Maternidade
   */
  if ('id_maternidade_nascimento' in dto) {
    if (dto.id_maternidade_nascimento === null) {
      data.tb_maternidade = { disconnect: true };
    } else {
      data.tb_maternidade = {
        connect: { id: dto.id_maternidade_nascimento },
      };
    }
    delete data.id_maternidade_nascimento;
  }

  /**
   * Periodo ARV nascimento
   */
  if ('id_periodo_arv_nascimento' in dto) {
    if (dto.id_periodo_arv_nascimento === null) {
      data.tb_periodo_arv_nascimento = { disconnect: true };
    } else {
      data.tb_periodo_arv_nascimento = {
        connect: { id: dto.id_periodo_arv_nascimento },
      };
    }
    delete data.id_periodo_arv_nascimento;
  }

  return data;
}

import { Prisma } from '@prisma/client';

export function mapUpdateCriancaExpostaHivDtoToPrisma(
  dto: any
): Prisma.tb_monitora_criancaexposta_hivUpdateInput {
  const data: Prisma.tb_monitora_criancaexposta_hivUpdateInput = {};

  // =====================
  // CAMPOS SIMPLES
  // =====================
  if (dto.dt_desfecho_criexp_hiv !== undefined) {
    data.dt_desfecho_criexp_hiv = dto.dt_desfecho_criexp_hiv;
  }

  if (dto.dt_saida_maternidade !== undefined) {
    data.dt_saida_maternidade = dto.dt_saida_maternidade;
  }

  if (dto.flg_tarv_azt !== undefined) {
    data.flg_tarv_azt = dto.flg_tarv_azt;
  }

  // =====================
  // RELACIONAMENTOS
  // =====================
  if (dto.id_paciente) {
    data.tb_paciente = {
      connect: { id: dto.id_paciente },
    };
  }

  if (dto.id_desfecho_criexp_hiv) {
    data.tb_desfecho_criancaexposta_hiv = {
      connect: { id: dto.id_desfecho_criexp_hiv },
    };
  }

  if (dto.id_unidade_monitoramento) {
    data.tb_unidade_monitoramento = {
      connect: { id: dto.id_unidade_monitoramento },
    };
  }

  if (dto.id_unidade_notific_sinan) {
    data.tb_unidade_notific_sinan = {
      connect: { id: dto.id_unidade_notific_sinan },
    };
  }

  if (dto.id_maternidade_nascimento) {
    data.tb_maternidade = {
      connect: { id: dto.id_maternidade_nascimento },
    };
  }

  return data;
}

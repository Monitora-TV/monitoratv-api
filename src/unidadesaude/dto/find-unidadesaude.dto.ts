export class FindUnidadesaudeDto {
  id_coordenadoria?: number;  // Pode ser opcional, pois no modelo Prisma é opcional
  id_supervisao?: number;  // Pode ser opcional
  id_uvis?: number;  // Pode ser opcional
  cnes_unidade?: string;  // Pode ser opcional e deve ter um tamanho de 1 a 10
  no_unidade?: string;  // Pode ser opcional e deve ter um tamanho de 1 a 100
  no_unidade_limpo?: string;  // Pode ser opcional e deve ter um tamanho de 1 a 100
  search?: string;  // Pode ser opcional e deve ter um tamanho de 1 a 100

}

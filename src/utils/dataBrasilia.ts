import { DateTime } from 'luxon'; // ou `import { zonedTimeToUtc } from 'date-fns-tz';` caso use date-fns

// Função para calcular a idade em anos, meses e dias
export const dataBrasilia = (data: string | Date) => {

  const dataBrasilia = DateTime.fromJSDate(new Date(data))
    .setZone('America/Sao_Paulo')  // Define o fuso horário de São Paulo (Brasília)
    .toFormat('yyyy-MM-dd'); // Formata para 'yyyy-MM-dd' (sem hora)

        // const dtCadastroResultado = new Date(dataBrasilia(record?.dt_cadastro_resultado||'')); // Usando a função importada
    return new Date(dataBrasilia);
};


import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service'; // Prisma para interação com o banco
import { TenantService } from 'src/tenant/tenant/tenant.service'; // Serviço de Tenant (acesso controlado)
import { CountCriancaexpostahiv } from './dto/count-criancaexpostahiv.dto';

@Injectable()
export class CriancaexpostahivService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly tenantService: TenantService;

  // Método para criar um novo registro
  async create(createCriancaexpostahivDto: any) {
    const existingRecord = await this.prisma.tb_monitora_criancaexposta_hiv.findFirst({
      where: {
        id_paciente: createCriancaexpostahivDto.id_paciente, // Exemplo de validação para paciente
      },
    });

    if (existingRecord) {
      throw new Error('Já existe um registro com este id_paciente.');
    }

    const newRecord = await this.prisma.tb_monitora_criancaexposta_hiv.create({
      data: createCriancaexpostahivDto,
    });

    return newRecord;
  }

  // Método para obter todos os registros
  async findAll() {
    console.log(this.tenantService.hierarquia_acesso);
    console.log(this.tenantService.cnes_vinculo);
    console.log('findall');
    const hierarquia_acesso = this.tenantService.hierarquia_acesso;
    const cnes_vinculo = this.tenantService.cnes_vinculo;

    let filter_unidade_monitoramento = {}; // Defina a variável como um objeto vazio inicialmente

    // Construção do filtro com base no tipo de hierarquia_acesso
    if (hierarquia_acesso === 'coordenadoria_regional') {
      filter_unidade_monitoramento = {
        tb_coordenadoria: {
          cnes_coordenadoria: cnes_vinculo,
        },
      };
    }

    if (hierarquia_acesso === 'supervisao_tecnica') {
      filter_unidade_monitoramento = {
        tb_supervisao: {
          cnes_supervisao: cnes_vinculo,
        },
      };
    }

    if (hierarquia_acesso === 'supervisao_uvis') {
      filter_unidade_monitoramento = {
        tb_uvis: {
          cnes_uvis: cnes_vinculo,
        },
      };
    }

    try {
      const records = await this.prisma.tb_monitora_criancaexposta_hiv.findMany({
        where: {
          tb_unidade_monitoramento: filter_unidade_monitoramento, // Usando o objeto de filtro
        },
        include: {
          tb_maternidade: {
            select: {
              cnes_unidade:true,
              no_unidade: true,
            },
          },
          tb_unidade_monitoramento: {
            select: {
              cnes_unidade: true,
              no_unidade: true,
              id_coordenadoria: true,
              id_supervisao: true,
              id_uvis: true,
              tb_coordenadoria: { select: { no_coordenadoria: true } },
              tb_supervisao_to_unidade_saude: { select: { no_supervisao: true } },
              tb_uvis: { select: { no_uvis: true } },
            },
          },
          tb_paciente: {
            select: {
              no_paciente: true,
            },
          },
          tb_desfecho_criancaexposta_hiv: {
            select: {
              no_desfecho_criancaexposta_hiv: true,
            },
          },
        },
      });

      return records || []; // Retorna um array vazio caso não haja registros
    } catch (error) {
      throw new Error('Erro ao buscar registros: ' + error.message);
    }
  }

  // Método para encontrar um registro específico por id
  async findOne(id: number) {
    try {
      const record = await this.prisma.tb_monitora_criancaexposta_hiv.findUnique({
        where: { id },
      });

      if (!record) {
        throw new Error(`Registro com id ${id} não encontrado.`);
      }

      return record;
    } catch (error) {
      throw new Error('Erro ao buscar registro: ' + error.message);
    }
  }

  // Método para atualizar um registro
  async update(id: number, updateCriancaexpostahivDto: any) {
    try {
      const updatedRecord = await this.prisma.tb_monitora_criancaexposta_hiv.update({
        where: { id },
        data: updateCriancaexpostahivDto,
      });

      return updatedRecord;
    } catch (error) {
      throw new Error('Erro ao atualizar registro: ' + error.message);
    }
  }

  // Método para remover um registro
  async remove(id: number) {
    try {
      const deletedRecord = await this.prisma.tb_monitora_criancaexposta_hiv.delete({
        where: { id },
      });

      return deletedRecord;
    } catch (error) {
      throw new Error('Erro ao remover registro: ' + error.message);
    }
  }



  async findByCoordenadoria(cnes_coordenadoria: string) {
    console.log('findByCoordenadoria');
    console.log(this.tenantService.hierarquia_acesso);
    console.log(this.tenantService.cnes_vinculo);

    
    return await this.prisma.tb_monitora_criancaexposta_hiv.findMany ({
      where: {
        tb_unidade_monitoramento: 
        {
          tb_coordenadoria: {
            cnes_coordenadoria: cnes_coordenadoria,
          },  
          
        }
      },
      include: {
        tb_maternidade: {
          select: {
            no_unidade: true,  // Aqui você seleciona o campo 'no_unidade' 
          }
        },
        tb_unidade_monitoramento: {
          select: {
            no_unidade: true,  // Aqui você seleciona o campo 'no_unidade' 
          }
        },
        tb_paciente: {
          select: {
            no_paciente: true,  // Aqui você seleciona o campo 'no_unidade' 
          }
        },
        tb_desfecho_criancaexposta_hiv: {
          select: {
            no_desfecho_criancaexposta_hiv: true,  // Aqui você seleciona o campo 'no_unidade' 
          }
        }
      }
    });
  }


  async findBySupervisao(cnes_supervisao: string) {
    console.log('findBySupervisao');
    console.log(this.tenantService.hierarquia_acesso);
    console.log(this.tenantService.cnes_vinculo);

    
    return await this.prisma.tb_monitora_criancaexposta_hiv.findMany ({
      where: {
        tb_unidade_monitoramento: 
        {
          tb_supervisao: {cnes_supervisao : cnes_supervisao }   
        }
      },
      include: {
        tb_maternidade: {
          select: {
            no_unidade: true,  // Aqui você seleciona o campo 'no_unidade' 
          }
        },
        tb_unidade_monitoramento: {
          select: {
            no_unidade: true,  // Aqui você seleciona o campo 'no_unidade' 
          }
        },
        tb_paciente: {
          select: {
            no_paciente: true,  // Aqui você seleciona o campo 'no_unidade' 
          }
        },
        tb_desfecho_criancaexposta_hiv: {
          select: {
            no_desfecho_criancaexposta_hiv: true,  // Aqui você seleciona o campo 'no_unidade' 
          }
        }
      }
    });
  }


  async findByUvis(cnes_uvis: string) {
    console.log('findByUvis');
    console.log(this.tenantService.hierarquia_acesso);
    console.log(this.tenantService.cnes_vinculo);

    
    return await this.prisma.tb_monitora_criancaexposta_hiv.findMany ({
      where: {
        tb_unidade_monitoramento: 
        {
          tb_uvis: {cnes_uvis : cnes_uvis }   
        }
      },
      include: {
        tb_maternidade: {
          select: {
            no_unidade: true,  // Aqui você seleciona o campo 'no_unidade' 
          }
        },
        tb_unidade_monitoramento: {
          select: {
            no_unidade: true,  // Aqui você seleciona o campo 'no_unidade' 
          }
        },
        tb_paciente: {
          select: {
            no_paciente: true,  // Aqui você seleciona o campo 'no_unidade' 
          }
        },
        tb_desfecho_criancaexposta_hiv: {
          select: {
            no_desfecho_criancaexposta_hiv: true,  // Aqui você seleciona o campo 'no_unidade' 
          }
        }
      }
    });
  }



  // Método para contar crianças expostas por desfecho
  async countCriancaexpostahivByDesfechoId(): Promise<CountCriancaexpostahiv[]> {
    try {
      // Passo 1: Agrupar os registros por id_desfecho_criexp_hiv e contar as ocorrências
      const result = await this.prisma.tb_monitora_criancaexposta_hiv.groupBy({
        by: ['id_desfecho_criexp_hiv'], // Agrupar pelo id do desfecho
        _count: {
          id_desfecho_criexp_hiv: true, // Contar os registros para cada desfecho
        },
      });

      // Passo 2: Buscar os nomes dos desfechos usando os IDs
      const desfechos = await this.prisma.tb_desfecho_criancaexposta_hiv.findMany({
        where: {
          id: {
            in: result.map(item => item.id_desfecho_criexp_hiv), // Buscar todos os desfechos que aparecem no resultado
          },
        },
        select: {
          id: true, // Garantir que estamos pegando os IDs
          no_desfecho_criancaexposta_hiv: true, // Buscar o nome do desfecho
        },
      });

      // Passo 3: Combinar os resultados (contagem e nomes)
      const countResult: CountCriancaexpostahiv[] = result.map(item => {
        const desfecho = desfechos.find(d => d.id === item.id_desfecho_criexp_hiv);
        return {
          id_desfecho_criexp_hiv: item.id_desfecho_criexp_hiv,
          no_desfecho_criancaexposta_hiv: desfecho ? desfecho.no_desfecho_criancaexposta_hiv : 'Desfecho não encontrado',
          total: item._count.id_desfecho_criexp_hiv,
        };
      });

      return countResult;
    } catch (error) {
      throw new Error('Erro ao contar crianças expostas por desfecho: ' + error.message);
    }
  }
  



}





  /*
  async countCriancaexpostahivByDesfechoId(): Promise<CountCriancaexpostahiv[]> {
    return this.prisma.tb_monitora_criancaexposta_hiv.aggregate(
      {
        _count: {
          id_desfecho_criexp_hiv: true,
        },
      }
    )
      .count('')
      .select('criancaexpostahivDesfecho.category_id, COUNT(*) as total')
      .groupBy('product.category_id')
      .getRawMany();
  }
  */    


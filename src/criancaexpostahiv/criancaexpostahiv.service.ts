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
    console.log('findall');

    
    return await this.prisma.tb_monitora_criancaexposta_hiv.findMany({
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


  // Método para encontrar um registro específico por id
  findOne(id: number) {
    return this.prisma.tb_monitora_criancaexposta_hiv.findUnique({
      where: { id },
    });
  }

  // Método para atualizar um registro
  update(id: number, updateCriancaexpostahivDto: any) {
    return this.prisma.tb_monitora_criancaexposta_hiv.update({
      where: { id },
      data: updateCriancaexpostahivDto,
    });
  }

  // Método para remover um registro
  remove(id: number) {
    return this.prisma.tb_monitora_criancaexposta_hiv.delete({
      where: { id },
    });
  }


  async findByCoordenadoria(cnes_coordenadoria: string) {
    console.log('findByCoordenadoria');
    console.log(this.tenantService.hierarquia_acesso);

    
    return await this.prisma.tb_monitora_criancaexposta_hiv.findMany ({
      where: {
        tb_unidade_monitoramento: 
        {
          tb_coordenadoria: {cnes_coordenadoria: cnes_coordenadoria }   
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

    
    return await this.prisma.tb_monitora_criancaexposta_hiv.findMany ({
      where: {
        tb_unidade_monitoramento: 
        {
          tb_supervisao_unidade_saude: {cnes_supervisao : cnes_supervisao }   
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


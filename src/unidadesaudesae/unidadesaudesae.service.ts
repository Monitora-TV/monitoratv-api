import { Inject, Injectable } from '@nestjs/common';
import { CreateUnidadesaudesaeDto } from './dto/create-unidadesaudesae.dto';
import { UpdateUnidadesaudesaeDto } from './dto/update-unidadesaudesae.dto';
import { PrismaService } from 'src/database/prisma.service'; // Prisma para interação com o banco
import { TenantService } from 'src/tenant/tenant/tenant.service'; // Serviço de Tenant (acesso controlado)


@Injectable()
export class UnidadesaudesaeService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly tenantService: TenantService;

  // Método para criar um novo registro
  async create(createUnidadesaudesaeDto: CreateUnidadesaudesaeDto) {
    const existingRecord = await this.prisma.tb_unidade_saude_sae.findFirst({
      where: {
        cnes_sae: createUnidadesaudesaeDto.cnes_sae, // Verifica se o 'no_filtro' já existe
      },
    });

    if (existingRecord) {
      throw new Error('Já existe uma unidade SAE com esse CNES.');
    }

    const newRecord = await this.prisma.tb_unidade_saude_sae.create({
      data: createUnidadesaudesaeDto,
    });

    return newRecord;
  }

  // Método para obter todos os registros
  /*
  async findAll() {
    console.log(this.tenantService.hierarquia_acesso);
    return await this.prisma.tb_unidade_saude_sae.findMany();
  }
  */  

  async findAll() {
    console.log('findall SAE');
    console.log(this.tenantService.hierarquia_acesso);
    console.log(this.tenantService.cnes_vinculo);

    let filter_unidade_sae = {}; // Defina a variável como um objeto vazio inicialmente

    // Construção do filtro com base no tipo de hierarquia_acesso
    if (this.tenantService.hierarquia_acesso === 'coordenadoria_regional') {
      filter_unidade_sae = {
        tb_coordenadoria: {
          cnes_coordenadoria: this.tenantService.cnes_vinculo,
        },
      };
    }

    if (this.tenantService.hierarquia_acesso === 'supervisao_tecnica') {
      filter_unidade_sae = {
        tb_supervisao: {
          cnes_supervisao: this.tenantService.cnes_vinculo,
        },
      };
    }

    if (this.tenantService.hierarquia_acesso === 'supervisao_uvis') {
      filter_unidade_sae = {
        tb_uvis: {
          cnes_uvis: this.tenantService.cnes_vinculo,
        },
      };
    }

    return await this.prisma.tb_unidade_saude_sae.findMany();
 }




  // Método para encontrar um registro específico por id
  findOne(id: number) {
    return this.prisma.tb_unidade_saude_sae.findUnique({
      where: { id },
    });
  }

  // Método para atualizar um registro
  update(id: number, updateUnidadesaudesaeDto: UpdateUnidadesaudesaeDto) {
    return this.prisma.tb_unidade_saude_sae.update({
      where: { id },
      data: updateUnidadesaudesaeDto,
    });
  }

  // Método para remover um registro
  remove(id: number) {
    return this.prisma.tb_unidade_saude_sae.delete({
      where: { id },
    });
  }
}




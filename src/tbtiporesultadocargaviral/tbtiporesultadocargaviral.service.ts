import { Inject, Injectable } from '@nestjs/common';
import { CreateTbtiporesultadocargaviralDto } from './dto/create-tbtiporesultadocargaviral.dto';
import { UpdateTbtiporesultadocargaviralDto } from './dto/update-tbtiporesultadocargaviral.dto';
import { PrismaService } from 'src/database/prisma.service';
import { TenantService } from 'src/tenant/tenant/tenant.service';
import { UsuariologService } from 'src/usuariolog/usuariolog.service';

@Injectable()
export class TbtiporesultadocargaviralService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly tenantService: TenantService;
  @Inject()
  private readonly usuariologService: UsuariologService;

  async create(createTbtiporesultadocargaviralDto: CreateTbtiporesultadocargaviralDto, userKeycloak: any) {

      const existingRecord = await this.prisma.tb_tipo_resultado_carga_viral.findFirst({
        where: {
        		no_filtro: createTbtiporesultadocargaviralDto.no_filtro,
        },
      });
      if (existingRecord) {
      	throw new Error('Já existe um registro com esse no_filtro.');
      }
      const newRecord = await this.prisma.tb_tipo_resultado_carga_viral.create({
      	data: createTbtiporesultadocargaviralDto,
      });

      await this.usuariologService.logAction(
      	userKeycloak.sub,
      	userKeycloak.preferred_username,
      	'Create',
      	'tb_tipo_resultado_carga_viral',
      	newRecord.id,
      	'Criando registro tb_tipo_resultado_carga_viral com ID:'+ newRecord.id||''
    	  );

    return newRecord;
  }

  async findAll() {
    return await this.prisma.tb_tipo_resultado_carga_viral.findMany();
  }

  findOne(id: number) {
    return this.prisma.tb_tipo_resultado_carga_viral.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTbtiporesultadocargaviralDto: UpdateTbtiporesultadocargaviralDto, userKeycloak: any) {

    const updatedRecord = await this.prisma.tb_tipo_resultado_carga_viral.update({
      where: { id },
      data: updateTbtiporesultadocargaviralDto,
    });

    await this.usuariologService.logAction(
      userKeycloak.sub,
      userKeycloak.preferred_username,
      'Update',
      'tb_tipo_resultado_carga_viral',
      updatedRecord.id,
      'Atualizado registro tb_tipo_resultado_carga_viral com ID:' + updatedRecord.id||''
    );

    return updatedRecord;

  }

  remove(id: number, userKeycloak: any) {
    return this.prisma.tb_tipo_resultado_carga_viral.delete({
      where: { id },
    });
  }

}

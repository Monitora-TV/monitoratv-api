
import { Inject, Injectable } from '@nestjs/common';
import { CreateTbtiporesultadoelisaDto } from './dto/create-tbtiporesultadoelisa.dto';
import { UpdateTbtiporesultadoelisaDto } from './dto/update-tbtiporesultadoelisa.dto';
import { PrismaService } from 'src/database/prisma.service';
import { TenantService } from 'src/tenant/tenant.service';
import { UsuariologService } from 'src/usuariolog/usuariolog.service';

@Injectable()
export class TbtiporesultadoelisaService {
  @Inject()
  private readonly prisma: PrismaService;
  @Inject()
  private readonly tenantService: TenantService;
  @Inject()
  private readonly usuariologService: UsuariologService;

  async create(createTbtiporesultadoelisaDto: CreateTbtiporesultadoelisaDto, userKeycloak: any) {

      const existingRecord = await this.prisma.tb_tipo_resultado_elisa.findFirst({
        where: {
        		no_filtro: createTbtiporesultadoelisaDto.no_filtro,
        },
      });
      if (existingRecord) {
      	throw new Error('Já existe um registro com esse no_filtro.');
      }
      const newRecord = await this.prisma.tb_tipo_resultado_elisa.create({
      	data: createTbtiporesultadoelisaDto,
      });

      await this.usuariologService.logAction(
      	userKeycloak.sub,
      	userKeycloak.preferred_username,
      	'Create',
      	'tb_tipo_resultado_elisa',
      	newRecord.id,
      	'Criando registro tb_tipo_resultado_elisa com ID:'+ newRecord.id||''
    	  );

    return newRecord;
  }

  async findAll() {
    return await this.prisma.tb_tipo_resultado_elisa.findMany();
  }

  findOne(id: number) {
    return this.prisma.tb_tipo_resultado_elisa.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateTbtiporesultadoelisaDto: UpdateTbtiporesultadoelisaDto, userKeycloak: any) {

    const updatedRecord = await this.prisma.tb_tipo_resultado_elisa.update({
      where: { id },
      data: updateTbtiporesultadoelisaDto,
    });

    await this.usuariologService.logAction(
      userKeycloak.sub,
      userKeycloak.preferred_username,
      'Update',
      'tb_tipo_resultado_elisa',
      updatedRecord.id,
      'Atualizado registro tb_tipo_resultado_elisa com ID:' + updatedRecord.id||''
    );

    return updatedRecord;

  }

  remove(id: number, userKeycloak: any) {
    return this.prisma.tb_tipo_resultado_elisa.delete({
      where: { id },
    });
  }

}

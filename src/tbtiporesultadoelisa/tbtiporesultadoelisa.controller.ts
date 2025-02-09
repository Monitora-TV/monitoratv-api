import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TbtiporesultadoelisaService } from './tbtiporesultadoelisa.service';
import { CreateTbtiporesultadoelisaDto } from './dto/create-tbtiporesultadoelisa.dto';
import { UpdateTbtiporesultadoelisaDto } from './dto/update-tbtiporesultadoelisa.dto';
import { JwtGuard } from './../auth/auth/jwt.guard';
import { TenantGuard } from './../tenant/tenant.guard';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tbtiporesultadoelisa')
@Controller('tb_tipo_resultado_elisa')
export class TbtiporesultadoelisaController {
  constructor(private readonly tbtiporesultadoelisaService: TbtiporesultadoelisaService) {}

  @UseGuards(JwtGuard, TenantGuard)
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro Tbtiporesultadoelisa' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  create(
  		@AuthenticatedUser() userKeycloak: any, 
  		@Body() createTbtiporesultadoelisaDto: CreateTbtiporesultadoelisaDto
  )
  {
    return this.tbtiporesultadoelisaService.create(createTbtiporesultadoelisaDto, userKeycloak);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os registros Tbtiporesultadoelisa' })
  @ApiResponse({ status: 200, description: 'Lista retornada.' })
  async findAll()
  {
    return await this.tbtiporesultadoelisaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro Tbtiporesultadoelisa por ID' })
  @ApiResponse({ status: 200, description: 'Tbtiporesultadoelisa encontrado.' })
  findOne(@Param('id') id: string) {
    return this.tbtiporesultadoelisaService.findOne(+id);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um registro Tbtiporesultadoelisa' })
  @ApiResponse({ status: 200, description: 'Registro atualizado com sucesso.' })
  update(
    @AuthenticatedUser() userKeycloak: any, 
    @Param('id') id: string, 
    @Body() updateTbtiporesultadoelisaDto: UpdateTbtiporesultadoelisaDto
  ) {
    return this.tbtiporesultadoelisaService.update(+id, updateTbtiporesultadoelisaDto, userKeycloak);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um registro Tbtiporesultadoelisa' })
  @ApiResponse({ status: 200, description: 'Registro deletado com sucesso.' })
  remove(
    @AuthenticatedUser() userKeycloak: any, 
    @Param('id') id: string 
  )
  {
    return this.tbtiporesultadoelisaService.remove(+id, userKeycloak);
  }

}

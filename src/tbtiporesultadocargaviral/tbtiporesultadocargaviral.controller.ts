import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TbtiporesultadocargaviralService } from './tbtiporesultadocargaviral.service';
import { CreateTbtiporesultadocargaviralDto } from './dto/create-tbtiporesultadocargaviral.dto';
import { UpdateTbtiporesultadocargaviralDto } from './dto/update-tbtiporesultadocargaviral.dto';
import { JwtGuard } from './../auth/auth/jwt.guard';
import { TenantGuard } from './../tenant/tenant.guard';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tbtiporesultadocargaviral')
@Controller('tb_tipo_resultado_carga_viral')
export class TbtiporesultadocargaviralController {
  constructor(private readonly tbtiporesultadocargaviralService: TbtiporesultadocargaviralService) {}

  @UseGuards(JwtGuard, TenantGuard)
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro Tbtiporesultadocargaviral' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  create(
  		@AuthenticatedUser() userKeycloak: any, 
  		@Body() createTbtiporesultadocargaviralDto: CreateTbtiporesultadocargaviralDto
  )
  {
    return this.tbtiporesultadocargaviralService.create(createTbtiporesultadocargaviralDto, userKeycloak);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os registros Tbtiporesultadocargaviral' })
  @ApiResponse({ status: 200, description: 'Lista retornada.' })
  async findAll()
  {
    return await this.tbtiporesultadocargaviralService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro Tbtiporesultadocargaviral por ID' })
  @ApiResponse({ status: 200, description: 'Tbtiporesultadocargaviral encontrado.' })
  findOne(@Param('id') id: string) {
    return this.tbtiporesultadocargaviralService.findOne(+id);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um registro Tbtiporesultadocargaviral' })
  @ApiResponse({ status: 200, description: 'Registro atualizado com sucesso.' })
  update(
    @AuthenticatedUser() userKeycloak: any, 
    @Param('id') id: string, 
    @Body() updateTbtiporesultadocargaviralDto: UpdateTbtiporesultadocargaviralDto
  ) {
    return this.tbtiporesultadocargaviralService.update(+id, updateTbtiporesultadocargaviralDto, userKeycloak);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um registro Tbtiporesultadocargaviral' })
  @ApiResponse({ status: 200, description: 'Registro deletado com sucesso.' })
  remove(
    @AuthenticatedUser() userKeycloak: any, 
    @Param('id') id: string 
  )
  {
    return this.tbtiporesultadocargaviralService.remove(+id, userKeycloak);
  }

}

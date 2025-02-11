import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TbcargaviralService } from './tbcargaviral.service';
import { CreateTbcargaviralDto } from './dto/create-tbcargaviral.dto';
import { UpdateTbcargaviralDto } from './dto/update-tbcargaviral.dto';
import { JwtGuard } from './../auth/auth/jwt.guard';
import { TenantGuard } from './../tenant/tenant.guard';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tbcargaviral')
@Controller('tb_carga_viral')
export class TbcargaviralController {
  constructor(private readonly tbcargaviralService: TbcargaviralService) {}

  @UseGuards(JwtGuard, TenantGuard)
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro Tbcargaviral' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  create(
  		@AuthenticatedUser() userKeycloak: any, 
  		@Body() createTbcargaviralDto: CreateTbcargaviralDto
  )
  {
    return this.tbcargaviralService.create(createTbcargaviralDto, userKeycloak);
  }

  @Get()
  @ApiOperation({ summary: 'Listar registros Tbcargaviral com filtros' })
  @ApiResponse({ status: 200, description: 'Lista retornada.' })
  async findAll(
    @Query('page') page: number, // Recebe 'page' da URL como parâmetro
    @Query('limit') limit: number, // Recebe 'limit' da URL como parâmetro
    @Query('filters') filters?: any // Recebe filtros dinâmicos se existirem
  ) {
    return await this.tbcargaviralService.findAll(page, limit, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro Tbcargaviral por ID' })
  @ApiResponse({ status: 200, description: 'Tbcargaviral encontrado.' })
  findOne(@Param('id') id: string) {
    return this.tbcargaviralService.findOne(+id);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um registro Tbcargaviral' })
  @ApiResponse({ status: 200, description: 'Registro atualizado com sucesso.' })
  update(
    @AuthenticatedUser() userKeycloak: any, 
    @Param('id') id: string, 
    @Body() updateTbcargaviralDto: UpdateTbcargaviralDto
  ) {
    return this.tbcargaviralService.update(+id, updateTbcargaviralDto, userKeycloak);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um registro Tbcargaviral' })
  @ApiResponse({ status: 200, description: 'Registro deletado com sucesso.' })
  remove(
    @AuthenticatedUser() userKeycloak: any, 
    @Param('id') id: string 
  )
  {
    return this.tbcargaviralService.remove(+id, userKeycloak);
  }

}

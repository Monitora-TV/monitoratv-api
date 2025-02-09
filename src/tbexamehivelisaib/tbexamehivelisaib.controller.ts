import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TbexamehivelisaibService } from './tbexamehivelisaib.service';
import { CreateTbexamehivelisaibDto } from './dto/create-tbexamehivelisaib.dto';
import { UpdateTbexamehivelisaibDto } from './dto/update-tbexamehivelisaib.dto';
import { JwtGuard } from './../auth/auth/jwt.guard';
import { TenantGuard } from './../tenant/tenant.guard';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tbexamehivelisaib')
@Controller('tb_exame_hiv_elisa_ib')
export class TbexamehivelisaibController {
  constructor(private readonly tbexamehivelisaibService: TbexamehivelisaibService) {}

  @UseGuards(JwtGuard, TenantGuard)
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro Tbexamehivelisaib' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  create(
  		@AuthenticatedUser() userKeycloak: any, 
  		@Body() createTbexamehivelisaibDto: CreateTbexamehivelisaibDto
  )
  {
    return this.tbexamehivelisaibService.create(createTbexamehivelisaibDto, userKeycloak);
  }

  
  @Get()
  @ApiOperation({ summary: 'Listar registros Tbexamehivelisaib com filtros' })
  @ApiResponse({ status: 200, description: 'Lista retornada.' })
  async findAll(
    @Query('page') page: number, // Recebe 'page' da URL como parâmetro
    @Query('limit') limit: number, // Recebe 'limit' da URL como parâmetro
    @Query('filters') filters?: any // Recebe filtros dinâmicos se existirem
  ) {
    return await this.tbexamehivelisaibService.findAll(page, limit, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro Tbexamehivelisaib por ID' })
  @ApiResponse({ status: 200, description: 'Tbexamehivelisaib encontrado.' })
  findOne(@Param('id') id: string) {
    return this.tbexamehivelisaibService.findOne(+id);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um registro Tbexamehivelisaib' })
  @ApiResponse({ status: 200, description: 'Registro atualizado com sucesso.' })
  update(
    @AuthenticatedUser() userKeycloak: any, 
    @Param('id') id: string, 
    @Body() updateTbexamehivelisaibDto: UpdateTbexamehivelisaibDto
  ) {
    return this.tbexamehivelisaibService.update(+id, updateTbexamehivelisaibDto, userKeycloak);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um registro Tbexamehivelisaib' })
  @ApiResponse({ status: 200, description: 'Registro deletado com sucesso.' })
  remove(
    @AuthenticatedUser() userKeycloak: any, 
    @Param('id') id: string 
  )
  {
    return this.tbexamehivelisaibService.remove(+id, userKeycloak);
  }
}

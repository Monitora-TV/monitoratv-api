import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TbunidadesaudeService } from './tbunidadesaude.service';
import { CreateTbunidadesaudeDto } from './dto/create-tbunidadesaude.dto';
import { UpdateTbunidadesaudeDto } from './dto/update-tbunidadesaude.dto';
import { JwtGuard } from './../auth/auth/jwt.guard';
import { TenantGuard } from './../tenant/tenant.guard';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tbunidadesaude')
@Controller('tb_unidade_saude')
export class TbunidadesaudeController {
  constructor(private readonly tbunidadesaudeService: TbunidadesaudeService) {}

  @UseGuards(JwtGuard, TenantGuard)
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro Tbunidadesaude' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  create(
  		@AuthenticatedUser() userKeycloak: any, 
  		@Body() createTbunidadesaudeDto: CreateTbunidadesaudeDto
  )
  {
    return this.tbunidadesaudeService.create(createTbunidadesaudeDto, userKeycloak);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os registros Tbunidadesaude' })
  @ApiResponse({ status: 200, description: 'Lista retornada.' })
  async findAll(
  	 @Query('page') page: number,
  	 @Query('limit') limit: number,
     @Query('filters') filters?: any // Recebe filtros dinâmicos se existirem
    )
  {
    return await this.tbunidadesaudeService.findAll(page, limit, filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro Tbunidadesaude por ID' })
  @ApiResponse({ status: 200, description: 'Tbunidadesaude encontrado.' })
  findOne(@Param('id') id: string) {
    return this.tbunidadesaudeService.findOne(+id);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um registro Tbunidadesaude' })
  @ApiResponse({ status: 200, description: 'Registro atualizado com sucesso.' })
  update(
    @AuthenticatedUser() userKeycloak: any, 
    @Param('id') id: string, 
    @Body() updateTbunidadesaudeDto: UpdateTbunidadesaudeDto
  ) {
    return this.tbunidadesaudeService.update(+id, updateTbunidadesaudeDto, userKeycloak);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um registro Tbunidadesaude' })
  @ApiResponse({ status: 200, description: 'Registro deletado com sucesso.' })
  remove(
    @AuthenticatedUser() userKeycloak: any, 
    @Param('id') id: string 
  )
  {
    return this.tbunidadesaudeService.remove(+id, userKeycloak);
  }

}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TbpacienteService } from './tbpaciente.service';
import { CreateTbpacienteDto } from './dto/create-tbpaciente.dto';
import { UpdateTbpacienteDto } from './dto/update-tbpaciente.dto';
import { JwtGuard } from './../auth/auth/jwt.guard';
import { TenantGuard } from './../tenant/tenant.guard';
import { AuthenticatedUser } from 'nest-keycloak-connect';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tbpaciente')
@Controller('tb_paciente')
export class TbpacienteController {
  constructor(private readonly tbpacienteService: TbpacienteService) {}

  @UseGuards(JwtGuard, TenantGuard)
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro Tbpaciente' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  create(
  		@AuthenticatedUser() userKeycloak: any, 
  		@Body() createTbpacienteDto: CreateTbpacienteDto
  )
  {
    return this.tbpacienteService.create(createTbpacienteDto, userKeycloak);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os registros Tbpaciente' })
  @ApiResponse({ status: 200, description: 'Lista retornada.' })
  async findAll(
    @Query('page') page: number, // Recebe 'page' da URL como parâmetro
    @Query('limit') limit: number, // Recebe 'limit' da URL como parâmetro
    @Query('filters') filters?: any // Recebe filtros dinâmicos se existirem
  ) {
    return await this.tbpacienteService.findAll(page, limit, filters);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro Tbpaciente por ID' })
  @ApiResponse({ status: 200, description: 'Tbpaciente encontrado.' })
  findOne(@Param('id') id: string) {
    return this.tbpacienteService.findOne(+id);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um registro Tbpaciente' })
  @ApiResponse({ status: 200, description: 'Registro atualizado com sucesso.' })
  update(
    @AuthenticatedUser() userKeycloak: any, 
    @Param('id') id: string, 
    @Body() updateTbpacienteDto: UpdateTbpacienteDto
  ) {
    return this.tbpacienteService.update(+id, updateTbpacienteDto, userKeycloak);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um registro Tbpaciente' })
  @ApiResponse({ status: 200, description: 'Registro deletado com sucesso.' })
  remove(
    @AuthenticatedUser() userKeycloak: any, 
    @Param('id') id: string 
  )
  {
    return this.tbpacienteService.remove(+id, userKeycloak);
  }

}

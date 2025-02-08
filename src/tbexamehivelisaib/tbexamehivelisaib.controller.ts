import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TbexamehivelisaibService } from './tbexamehivelisaib.service';
import { CreateTbexamehivelisaibDto } from './dto/create-tbexamehivelisaib.dto';
import { UpdateTbexamehivelisaibDto } from './dto/update-tbexamehivelisaib.dto';
import { JwtGuard } from './../auth/auth/jwt.guard';
import { TenantGuard } from './../tenant/tenant.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tbexamehivelisaib')
@Controller('exame_hiv_elisa_ib')
export class TbexamehivelisaibController {
  constructor(private readonly tbexamehivelisaibService: TbexamehivelisaibService) {}

  @UseGuards(JwtGuard, TenantGuard)
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro Tbexamehivelisaib' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  create(@Body() createTbexamehivelisaibDto: CreateTbexamehivelisaibDto) {
    return this.tbexamehivelisaibService.create(createTbexamehivelisaibDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os registros Tbexamehivelisaib com paginação' })
  @ApiResponse({ status: 200, description: 'Lista retornada.' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('id_paciente') id_paciente?: number, // Novo parâmetro de consulta
  ) {
    return await this.tbexamehivelisaibService.findAll(page, limit, id_paciente);
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
    @Param('id') id: string, 
    @Body() updateTbexamehivelisaibDto: UpdateTbexamehivelisaibDto
  ) {
    return this.tbexamehivelisaibService.update(+id, updateTbexamehivelisaibDto);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um registro Tbexamehivelisaib' })
  @ApiResponse({ status: 200, description: 'Registro deletado com sucesso.' })
  remove(@Param('id') id: string) {
    return this.tbexamehivelisaibService.remove(+id);
  }

}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TbperiodoarvnascimentoService } from './tbperiodoarvnascimento.service';
import { CreateTbperiodoarvnascimentoDto } from './dto/create-tbperiodoarvnascimento.dto';
import { UpdateTbperiodoarvnascimentoDto } from './dto/update-tbperiodoarvnascimento.dto';
import { JwtGuard } from './../auth/auth/jwt.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tbperiodoarvnascimento')
@Controller('tb_periodo_arv_nascimento')
export class TbperiodoarvnascimentoController {
  constructor(private readonly tbperiodoarvnascimentoService: TbperiodoarvnascimentoService) {}

  @UseGuards(JwtGuard)
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro Tbperiodoarvnascimento' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  create(
  		@Body() createTbperiodoarvnascimentoDto: CreateTbperiodoarvnascimentoDto
  )
  {
    return this.tbperiodoarvnascimentoService.create(createTbperiodoarvnascimentoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os registros Tbperiodoarvnascimento' })
  @ApiResponse({ status: 200, description: 'Lista retornada.' })
  async findAll()
  {
    return await this.tbperiodoarvnascimentoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro Tbperiodoarvnascimento por ID' })
  @ApiResponse({ status: 200, description: 'Tbperiodoarvnascimento encontrado.' })
  findOne(@Param('id') id: string) {
    return this.tbperiodoarvnascimentoService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um registro Tbperiodoarvnascimento' })
  @ApiResponse({ status: 200, description: 'Registro atualizado com sucesso.' })
  update(
    @Param('id') id: string, 
    @Body() updateTbperiodoarvnascimentoDto: UpdateTbperiodoarvnascimentoDto
  ) {
    return this.tbperiodoarvnascimentoService.update(+id, updateTbperiodoarvnascimentoDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um registro Tbperiodoarvnascimento' })
  @ApiResponse({ status: 200, description: 'Registro deletado com sucesso.' })
  remove(
    @Param('id') id: string 
  )
  {
    return this.tbperiodoarvnascimentoService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TbalertagestantehivService } from './tbalertagestantehiv.service';
import { CreateTbalertagestantehivDto } from './dto/create-tbalertagestantehiv.dto';
import { UpdateTbalertagestantehivDto } from './dto/update-tbalertagestantehiv.dto';
import { JwtGuard } from './../auth/auth/jwt.guard';
import { TenantGuard } from './../tenant/tenant.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tbalertagestantehiv')
@Controller('tb_alerta_gestante_hiv')
export class TbalertagestantehivController {
  constructor(private readonly tbalertagestantehivService: TbalertagestantehivService) {}

  @UseGuards(JwtGuard, TenantGuard)
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro Tbalertagestantehiv' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  create(@Body() createTbalertagestantehivDto: CreateTbalertagestantehivDto) {
    return this.tbalertagestantehivService.create(createTbalertagestantehivDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os registros Tbalertagestantehiv' })
  @ApiResponse({ status: 200, description: 'Lista retornada.' })
  async findAll() {
    return await this.tbalertagestantehivService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro Tbalertagestantehiv por ID' })
  @ApiResponse({ status: 200, description: 'Tbalertagestantehiv encontrado.' })
  findOne(@Param('id') id: string) {
    return this.tbalertagestantehivService.findOne(+id);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um registro Tbalertagestantehiv' })
  @ApiResponse({ status: 200, description: 'Registro atualizado com sucesso.' })
  update(
    @Param('id') id: string, 
    @Body() updateTbalertagestantehivDto: UpdateTbalertagestantehivDto
  ) {
    return this.tbalertagestantehivService.update(+id, updateTbalertagestantehivDto);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um registro Tbalertagestantehiv' })
  @ApiResponse({ status: 200, description: 'Registro deletado com sucesso.' })
  remove(@Param('id') id: string) {
    return this.tbalertagestantehivService.remove(+id);
  }

}

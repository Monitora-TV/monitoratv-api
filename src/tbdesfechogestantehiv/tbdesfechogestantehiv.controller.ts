import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TbdesfechogestantehivService } from './tbdesfechogestantehiv.service';
import { CreateTbdesfechogestantehivDto } from './dto/create-tbdesfechogestantehiv.dto';
import { UpdateTbdesfechogestantehivDto } from './dto/update-tbdesfechogestantehiv.dto';
import { JwtGuard } from './../auth/auth/jwt.guard';
import { TenantGuard } from './../tenant/tenant.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tbdesfechogestantehiv')
@Controller('tb_desfecho_gestante_hiv')
export class TbdesfechogestantehivController {
  constructor(private readonly tbdesfechogestantehivService: TbdesfechogestantehivService) {}

  @UseGuards(JwtGuard, TenantGuard)
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro Tbdesfechogestantehiv' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  create(@Body() createTbdesfechogestantehivDto: CreateTbdesfechogestantehivDto) {
    return this.tbdesfechogestantehivService.create(createTbdesfechogestantehivDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os registros Tbdesfechogestantehiv' })
  @ApiResponse({ status: 200, description: 'Lista retornada.' })
  async findAll() {
    return await this.tbdesfechogestantehivService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro Tbdesfechogestantehiv por ID' })
  @ApiResponse({ status: 200, description: 'Tbdesfechogestantehiv encontrado.' })
  findOne(@Param('id') id: string) {
    return this.tbdesfechogestantehivService.findOne(+id);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um registro Tbdesfechogestantehiv' })
  @ApiResponse({ status: 200, description: 'Registro atualizado com sucesso.' })
  update(
    @Param('id') id: string, 
    @Body() updateTbdesfechogestantehivDto: UpdateTbdesfechogestantehivDto
  ) {
    return this.tbdesfechogestantehivService.update(+id, updateTbdesfechogestantehivDto);
  }

  @UseGuards(JwtGuard, TenantGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um registro Tbdesfechogestantehiv' })
  @ApiResponse({ status: 200, description: 'Registro deletado com sucesso.' })
  remove(@Param('id') id: string) {
    return this.tbdesfechogestantehivService.remove(+id);
  }

}

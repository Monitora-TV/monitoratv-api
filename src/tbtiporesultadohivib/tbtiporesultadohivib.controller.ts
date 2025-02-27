import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { TbtiporesultadohivibService } from './tbtiporesultadohivib.service';
import { CreateTbtiporesultadohivibDto } from './dto/create-tbtiporesultadohivib.dto';
import { UpdateTbtiporesultadohivibDto } from './dto/update-tbtiporesultadohivib.dto';
import { JwtGuard } from './../auth/auth/jwt.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Tbtiporesultadohivib')
@Controller('tb_tipo_resultado_hivib')
export class TbtiporesultadohivibController {
  constructor(private readonly tbtiporesultadohivibService: TbtiporesultadohivibService) {}

  @UseGuards(JwtGuard)
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro Tbtiporesultadohivib' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  create(
  		@Body() createTbtiporesultadohivibDto: CreateTbtiporesultadohivibDto
  )
  {
    return this.tbtiporesultadohivibService.create(createTbtiporesultadohivibDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os registros Tbtiporesultadohivib' })
  @ApiResponse({ status: 200, description: 'Lista retornada.' })
  async findAll()
  {
    return await this.tbtiporesultadohivibService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro Tbtiporesultadohivib por ID' })
  @ApiResponse({ status: 200, description: 'Tbtiporesultadohivib encontrado.' })
  findOne(@Param('id') id: string) {
    return this.tbtiporesultadohivibService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um registro Tbtiporesultadohivib' })
  @ApiResponse({ status: 200, description: 'Registro atualizado com sucesso.' })
  update(
    @Param('id') id: string, 
    @Body() updateTbtiporesultadohivibDto: UpdateTbtiporesultadohivibDto
  ) {
    return this.tbtiporesultadohivibService.update(+id, updateTbtiporesultadohivibDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um registro Tbtiporesultadohivib' })
  @ApiResponse({ status: 200, description: 'Registro deletado com sucesso.' })
  remove(
    @Param('id') id: string 
  )
  {
    return this.tbtiporesultadohivibService.remove(+id);
  }

}

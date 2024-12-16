import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JwtGuard } from './../auth/auth/jwt.guard'; // Guard de Autenticação JWT
import { TenantGuard } from './../tenant/tenant.guard'; // Guard de Tenant (verificação de acesso)
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; // Para a documentação OpenAPI
import { CoordenadoriaService } from './coordenadoria.service';
import { CreateCoordenadoriaDto } from './dto/create-coordenadoria.dto';
import { UpdateCoordenadoriaDto } from './dto/update-coordenadoria.dto';



@ApiTags('Coordenadorias de saúde') // Define o grupo de tags para a documentação OpenAPI
@Controller('coordenadoria')
export class CoordenadoriaController {
  constructor(private readonly coordenadoriaService: CoordenadoriaService) {}

  // Rota para criar um novo registro de coordenadoria
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro de coordenadoria' })
  @ApiResponse({ status: 201, description: 'Registro de coordenadoria criado com sucesso.' })
  create(@Body() createCoordenadoriaDto: CreateCoordenadoriaDto) {
    return this.coordenadoriaService.create(createCoordenadoriaDto);
  }

  // Rota para listar todos os registros de coordenadoria
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Get()
  @ApiOperation({ summary: 'Listar todos os registros de coordenadoria' })
  @ApiResponse({ status: 200, description: 'Lista de coordenadoria retornada.' })
  async findAll() {
    return await this.coordenadoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coordenadoriaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoordenadoriaDto: UpdateCoordenadoriaDto) {
    return this.coordenadoriaService.update(+id, updateCoordenadoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coordenadoriaService.remove(+id);
  }
}

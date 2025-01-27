import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MaternidadeService } from './maternidade.service';
import { CreateMaternidadeDto } from './dto/create-maternidade.dto';
import { UpdateMaternidadeDto } from './dto/update-maternidade.dto';
import { JwtGuard } from './../auth/auth/jwt.guard'; // Guard de Autenticação JWT
import { TenantGuard } from './../tenant/tenant.guard'; // Guard de Tenant (verificação de acesso)
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; // Para a documentação OpenAPI


@ApiTags('Maternidade') // Define o grupo de tags para a documentação OpenAPI
@Controller('maternidade')
export class MaternidadeController {
  constructor(private readonly maternidadeService: MaternidadeService) {}

  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro de Maternidade' })
  @ApiResponse({ status: 201, description: 'Registro de Maternidade criado com sucesso.' })
  create(@Body() createMaternidadeDto: CreateMaternidadeDto) {
    return this.maternidadeService.create(createMaternidadeDto);
  }

  // Rota para listar todos os registros de Maternidade
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Get()
  @ApiOperation({ summary: 'Listar todos os registros de Maternidade' })
  @ApiResponse({ status: 200, description: 'Lista de Maternidades retornada.' })
  async findAll() {
    return await this.maternidadeService.findAll();
  }

  // Rota para buscar um registro específico de Maternidade por ID
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro de Maternidade por ID' })
  @ApiResponse({ status: 200, description: 'Maternidade encontrada.' })
  findOne(@Param('id') id: string) {
    return this.maternidadeService.findOne(+id); // O id é convertido para número
  }

  // Rota para atualizar um registro de Maternidade
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um registro de Maternidade' })
  @ApiResponse({ status: 200, description: 'Registro de Maternidade atualizado com sucesso.' })
  update(
    @Param('id') id: string, 
    @Body() updateMaternidadeDto: UpdateMaternidadeDto
  ) {
    return this.maternidadeService.update(+id, updateMaternidadeDto);
  }

  // Rota para remover um registro de Maternidade
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um registro de Maternidade' })
  @ApiResponse({ status: 200, description: 'Registro de Maternidade deletado com sucesso.' })
  remove(@Param('id') id: string) {
    return this.maternidadeService.remove(+id); // O id é convertido para número
  }
 

}

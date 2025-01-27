import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UnidadesaudesaeService } from './unidadesaudesae.service';
import { CreateUnidadesaudesaeDto } from './dto/create-unidadesaudesae.dto';
import { UpdateUnidadesaudesaeDto } from './dto/update-unidadesaudesae.dto';
import { JwtGuard } from './../auth/auth/jwt.guard'; // Guard de Autenticação JWT
import { TenantGuard } from './../tenant/tenant.guard'; // Guard de Tenant (verificação de acesso)
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; // Para a documentação OpenAPI


@ApiTags('Unidade de Saude SAE') // Define o grupo de tags para a documentação OpenAPI
@Controller('unidadesaudesae')
export class UnidadesaudesaeController {
  constructor(private readonly unidadesaudesaeService: UnidadesaudesaeService) {}

  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro Unidade SAE' })
  @ApiResponse({ status: 201, description: 'Registro de Unidade SAE criado com sucesso.' })
  create(@Body() createUnidadesaudesaeDto: CreateUnidadesaudesaeDto) {
    return this.unidadesaudesaeService.create(createUnidadesaudesaeDto);
  }

  // Rota para listar todos os registros SAE
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Get()
  @ApiOperation({ summary: 'Listar todos os registros de Unidade SAE' })
  @ApiResponse({ status: 200, description: 'Lista de Unidade SAE retornada.' })
  async findAll() {
    return await this.unidadesaudesaeService.findAll();
  }

  // Rota para buscar um registro específico de Unidade SAE por ID
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro de Unidade SAE por ID' })
  @ApiResponse({ status: 200, description: 'Unidade SAE encontrada.' })
  findOne(@Param('id') id: string) {
    return this.unidadesaudesaeService.findOne(+id); // O id é convertido para número
  }

  // Rota para atualizar um registro de Unidade SAE
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um registro de Unidade SAE' })
  @ApiResponse({ status: 200, description: 'Registro de Unidade SAE atualizado com sucesso.' })
  update(
    @Param('id') id: string, 
    @Body() updateUnidadesaudesaeDto: UpdateUnidadesaudesaeDto
  ) {
    return this.unidadesaudesaeService.update(+id, updateUnidadesaudesaeDto);
  }

  // Rota para remover um registro de Unidade SAE
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um registro de Unidade SAE' })
  @ApiResponse({ status: 200, description: 'Registro de Unidade SAE deletado com sucesso.' })
  remove(@Param('id') id: string) {
    return this.unidadesaudesaeService.remove(+id); // O id é convertido para número
  }

}

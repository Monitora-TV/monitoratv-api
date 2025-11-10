import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UnidadesaudeService } from './unidadesaude.service';
import { CreateUnidadesaudeDto } from './dto/create-unidadesaude.dto';
import { UpdateUnidadesaudeDto } from './dto/update-unidadesaude.dto';
import { JwtGuard } from './../auth/auth/jwt.guard'; // Guard de Autenticação JWT
import { TenantGuard } from './../tenant/tenant.guard'; // Guard de Tenant (verificação de acesso)
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; // Para a documentação OpenAPI
import { tb_unidade_saude } from '@prisma/client';


@ApiTags('Unidade de Saude') // Define o grupo de tags para a documentação OpenAPI
@Controller('unidadesaude')
export class UnidadesaudeController {
  constructor(private readonly unidadesaudeService: UnidadesaudeService) {}

  // Rota para criar um novo registro 
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro de unidade de saude' })
  @ApiResponse({ status: 201, description: 'Registro de unidade de saude criado com sucesso.' })
  create(@Body() createUnidadesaudeDto: CreateUnidadesaudeDto) {
    return this.unidadesaudeService.create(createUnidadesaudeDto);
  }


  // Rota para listar todos os registros com condicao
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Get('filter/:searchString')
  async getFilteredUnidades(
    @Param('searchString') searchString: string,
  ): Promise<tb_unidade_saude[]> {
    return this.unidadesaudeService.unidades({
      where: {
        OR: [
          {
            no_unidade: { contains: searchString.toUpperCase() },
          },
          {
            no_unidade_limpo: { contains: searchString.toUpperCase() },
          },
          {
            cnes_unidade: { contains: searchString },
          },
        ],
      },
      orderBy: {no_unidade: 'asc'},
      include: {
        tb_coordenadoria: {
          select: {
            no_coordenadoria: true,
          },
        },
        tb_supervisao : {
          select: {
            no_supervisao: true,
          },
        },
        tb_uvis: {
          select: {
            no_uvis: true,
          },
        },
      },
    });
  }

  // Rota para listar todos os registros 
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Get()
  @ApiOperation({ summary: 'Listar todos os registros de unidade de saude' })
  @ApiResponse({ status: 200, description: 'Lista de unidade de saude retornada.' })
  async findAll() {
    return this.unidadesaudeService.findAll();
  }

  // Rota para buscar um registro específico por ID
  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro de unidade de saude por ID' })
  @ApiResponse({ status: 200, description: 'Unidade de saude encontrado.' })
  findOne(@Param('id') id: string) {
    return this.unidadesaudeService.findOne(+id);
  }

  // Rota para atualizar um registro 
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um registro de unidade de saude' })
  @ApiResponse({ status: 200, description: 'Registro de unidade de saude atualizado com sucesso.' })
  update(@Param('id') id: string, @Body() updateUnidadesaudeDto: UpdateUnidadesaudeDto) {
    return this.unidadesaudeService.update(+id, updateUnidadesaudeDto);
  }

  // Rota para remover um registro 
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unidadesaudeService.remove(+id);
  }
}

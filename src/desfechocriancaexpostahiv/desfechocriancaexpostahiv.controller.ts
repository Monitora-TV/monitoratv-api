import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DesfechocriancaexpostahivService } from './desfechocriancaexpostahiv.service';
import { CreateDesfechocriancaexpostahivDto } from './dto/create-desfechocriancaexpostahiv.dto';
import { UpdateDesfechocriancaexpostahivDto } from './dto/update-desfechocriancaexpostahiv.dto';
import { JwtGuard } from './../auth/auth/jwt.guard'; // Guard de Autenticação JWT
import { TenantGuard } from './../tenant/tenant.guard'; // Guard de Tenant (verificação de acesso)
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; // Para a documentação OpenAPI
import { AuthenticatedUser, Public, Roles, RoleMatchingMode } from 'nest-keycloak-connect';


@ApiTags('Desfecho Criança Exposta ao HIV') // Define o grupo de tags para a documentação OpenAPI
@Controller('desfechocriancaexpostahiv')
export class DesfechocriancaexpostahivController {
  constructor(
    private readonly desfechocriancaexpostahivService: DesfechocriancaexpostahivService
  ) {}

  // Rota para criar um novo registro de desfecho
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro de desfecho' })
  @ApiResponse({ status: 201, description: 'Registro de desfecho criado com sucesso.' })
  create(
    @AuthenticatedUser() user: any,
    @Body() createDesfechocriancaexpostahivDto: CreateDesfechocriancaexpostahivDto ) {
    return this.desfechocriancaexpostahivService.create(createDesfechocriancaexpostahivDto);
  }

  // Rota para listar todos os registros de desfecho
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Get()
  @ApiOperation({ summary: 'Listar todos os registros de desfecho' })
  @ApiResponse({ status: 200, description: 'Lista de desfechos retornada.' })
  async findAll() {
    return await this.desfechocriancaexpostahivService.findAll();
  }

  // Rota para buscar um registro específico de desfecho por ID
  // Rota para listar todos os registros de desfecho
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro de desfecho por ID' })
  @ApiResponse({ status: 200, description: 'Desfecho encontrado.' })
  findOne(@Param('id') id: string) {
    return this.desfechocriancaexpostahivService.findOne(+id); // O id é convertido para número
  }

  // Rota para atualizar um registro de desfecho
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um registro de desfecho' })
  @ApiResponse({ status: 200, description: 'Registro de desfecho atualizado com sucesso.' })
  update(
    @Param('id') id: string, 
    @Body() updateDesfechocriancaexpostahivDto: UpdateDesfechocriancaexpostahivDto
  ) {
    return this.desfechocriancaexpostahivService.update(+id, updateDesfechocriancaexpostahivDto);
  }

  // Rota para remover um registro de desfecho
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um registro de desfecho' })
  @ApiResponse({ status: 200, description: 'Registro de desfecho deletado com sucesso.' })
  remove(@Param('id') id: string) {
    return this.desfechocriancaexpostahivService.remove(+id); // O id é convertido para número
  }
}

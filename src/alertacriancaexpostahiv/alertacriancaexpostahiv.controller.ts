import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AlertacriancaexpostahivService } from './alertacriancaexpostahiv.service';
import { CreateAlertacriancaexpostahivDto } from './dto/create-alertacriancaexpostahiv.dto';
import { UpdateAlertacriancaexpostahivDto } from './dto/update-alertacriancaexpostahiv.dto';
import { JwtGuard } from './../auth/auth/jwt.guard'; // Guard de Autenticação JWT
import { TenantGuard } from './../tenant/tenant.guard'; // Guard de Tenant (verificação de acesso)
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; // Para a documentação OpenAPI

@ApiTags('Alerta Criança Exposta ao HIV') // Define o grupo de tags para a documentação OpenAPI
@Controller('alertacriancaexpostahiv')
export class AlertacriancaexpostahivController {
  constructor(private readonly alertacriancaexpostahivService: AlertacriancaexpostahivService) {}

  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Post()
  @ApiOperation({ summary: 'Criar um novo registro Alerta Crianca Exposta HIV' })
  @ApiResponse({ status: 201, description: 'Registro Alerta Crianca Exposta HIV criado com sucesso.' })
  create(@Body() createAlertacriancaexpostahivDto: CreateAlertacriancaexpostahivDto) {
    return this.alertacriancaexpostahivService.create(createAlertacriancaexpostahivDto);
  }

  // Rota para listar todos os registros de Alerta Crianca Exposta HIV
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Get()
  @ApiOperation({ summary: 'Listar todos os registros Alerta Crianca Exposta HIV' })
  @ApiResponse({ status: 200, description: 'Lista Alerta Crianca Exposta HIV retornada.' })
  async findAll() {
    return await this.alertacriancaexpostahivService.findAll();
  }

  // Rota para buscar um registro específico de desfecho por ID
  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro Alerta Crianca Exposta HIV por ID' })
  @ApiResponse({ status: 200, description: 'Alerta Crianca Exposta HIV encontrado.' })
  findOne(@Param('id') id: string) {
    return this.alertacriancaexpostahivService.findOne(+id); // O id é convertido para número
  }

  // Rota para atualizar um registro Alerta Crianca Exposta HIV
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um registro Alerta Crianca Exposta HIV' })
  @ApiResponse({ status: 200, description: 'Registro Alerta Crianca Exposta HIV atualizado com sucesso.' })
  update(
    @Param('id') id: string, 
    @Body() updateAlertacriancaexpostahivDto: UpdateAlertacriancaexpostahivDto
  ) {
    return this.alertacriancaexpostahivService.update(+id, updateAlertacriancaexpostahivDto);
  }


  // Rota para remover um registro Alerta Crianca Exposta HIV
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um registro Alerta Crianca Exposta HIV' })
  @ApiResponse({ status: 200, description: 'Registro Alerta Crianca Exposta HIV deletado com sucesso.' })
  remove(@Param('id') id: string) {
    return this.alertacriancaexpostahivService.remove(+id); // O id é convertido para número
  }


}

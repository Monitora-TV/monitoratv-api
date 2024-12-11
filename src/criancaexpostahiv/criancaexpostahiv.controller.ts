import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CriancaexpostahivService } from './criancaexpostahiv.service';
import { CreateCriancaexpostahivDto } from './dto/create-criancaexpostahiv.dto';
import { UpdateCriancaexpostahivDto } from './dto/update-criancaexpostahiv.dto';
import { JwtGuard } from './../auth/auth/jwt.guard'; // Guard de Autenticação JWT
import { TenantGuard } from './../tenant/tenant.guard'; // Guard de Tenant (verificação de acesso)
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'; // Para a documentação OpenAPI
import { any } from 'zod';

@ApiTags('Monitora Criança Exposta ao HIV') // Define o grupo de tags para a documentação OpenAPI
@Controller('criancaexpostahiv')
export class CriancaexpostahivController {
  constructor(private readonly criancaexpostahivService: CriancaexpostahivService) {}

  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard

  @Post()
  @ApiOperation({ summary: 'Criar um novo registro de de Criança Exposta' })
  @ApiResponse({ status: 201, description: 'Registro de Criança Exposta criado com sucesso.' })
  create(@Body() createCriancaexpostahivDto: CreateCriancaexpostahivDto) {
    return this.criancaexpostahivService.create(createCriancaexpostahivDto);
  }


  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Get()
  async getByCnes(
    @Query('cnes_coordenadoria') cnes_coordenadoria: string,
    @Query('cnes_supervisao') cnes_supervisao: string,
    @Query('cnes_uvis') cnes_uvis: string
  )
  {
  // Verificar qual parâmetro está presente e chamar o método correspondente
  if (cnes_coordenadoria) {
    return this.criancaexpostahivService.findByCoordenadoria(cnes_coordenadoria);
  }
  
  if (cnes_supervisao) {
    return this.criancaexpostahivService.findBySupervisao(cnes_supervisao);
  }

  if (cnes_uvis) {
    return this.criancaexpostahivService.findByUvis(cnes_uvis);
  }

  // Se nenhum parâmetro for passado, você pode retornar uma resposta padrão ou um erro.
  //return { message: 'Nenhum parâmetro válido foi fornecido.' };
  return this.criancaexpostahivService.findAll();
  }


  // Rota para listar todos os registros de Criança Exposta
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Get()
  @ApiOperation({ summary: 'Listar todos os registros de Criança Exposta' })
  @ApiResponse({ status: 200, description: 'Lista de Criança Exposta retornada.' })
  async findAll() {
    return await this.criancaexpostahivService.findAll();
  }

  // Rota para buscar um registro específico de Criança Exposta por ID
  @Get(':id')
  @ApiOperation({ summary: 'Buscar um registro de Criança Exposta por ID' })
  @ApiResponse({ status: 200, description: 'Criança Exposta encontrado.' })
  findOne(@Param('id') id: string) {
    return this.criancaexpostahivService.findOne(+id); // O id é convertido para número
  }



  // Rota para atualizar um registro de desfecho
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um registro de Criança Exposta' })
  @ApiResponse({ status: 200, description: 'Registro de Criança Exposta atualizado com sucesso.' })
  update(
    @Param('id') id: string, 
    @Body() updateCriancaexpostahivDto: UpdateCriancaexpostahivDto
  ) {
    return this.criancaexpostahivService.update(+id, updateCriancaexpostahivDto);
  }

  // Rota para remover um registro deCriança Exposta
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Delete(':id')
  @ApiOperation({ summary: 'Deletar um registro de Criança Exposta' })
  @ApiResponse({ status: 200, description: 'Registro de Criança Exposta deletado com sucesso.' })
  remove(@Param('id') id: string) {
    return this.criancaexpostahivService.remove(+id); // O id é convertido para número
  }

  
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { CriancaexpostahivService } from './criancaexpostahiv.service';
import { CreateCriancaexpostahivDto } from './dto/create-criancaexpostahiv.dto';
import { UpdateCriancaexpostahivDto } from './dto/update-criancaexpostahiv.dto';
import { CountCriancaExpostaHivStatus } from './dto/count-criancaexpostahiv.dto';

import { UserContextGuard } from '../auth/guards/user-context.guard';
// opcional (já pronto para uso):
// import { UserContext } from '../auth/user-context/user-context.decorator';
// import { UserContextService } from '../auth/user-context/user-context.service';

@ApiTags('Monitora Criança Exposta ao HIV')
@UseGuards(AuthGuard('jwt'), UserContextGuard)
@Controller('criancaexpostahiv')
export class CriancaexpostahivController {
  constructor(
    private readonly criancaexpostahivService: CriancaexpostahivService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar registros Criança Exposta com filtros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Criança Exposta retornada.',
  })
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('filters') filters?: any,
  ) {
    return this.criancaexpostahivService.findAll(page, limit, filters);
  }

  @Get('countcriancaexpostahivdesfechogeral')
  @ApiOperation({
    summary: 'Contar registros de Criança Exposta por Desfecho (geral)',
  })
  async countCriancaExpostaDesfechoGeral() {
    return this.criancaexpostahivService.countCriancaExpostaHivDesfechoGeral();
  }

  @Get('countcriancaexpostahivdesfecho')
  @ApiOperation({
    summary: 'Contar registros de Criança Exposta por Desfecho',
  })
  async countCriancaExpostaDesfecho() {
    return this.criancaexpostahivService.countCriancaExpostaHivDesfecho();
  }

  @Get('countcriancaexpostahivalerta')
  @ApiOperation({
    summary: 'Contar registros de Criança Exposta por Alerta',
  })
  async countCriancaExpostaAlerta() {
    return this.criancaexpostahivService.countCriancaExpostaHivAlerta();
  }

  @Get('countcriancaexpostahivstatus')
  @ApiOperation({
    summary: 'Contar Crianças Expostas agrupadas por Status do Desfecho',
  })
  async countCriancaExpostaStatus(): Promise<CountCriancaExpostaHivStatus[]> {
    return this.criancaexpostahivService.countCriancaExpostaHivStatus();
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo registro de Criança Exposta' })
  @ApiResponse({
    status: 201,
    description: 'Registro criado com sucesso.',
  })
  create(@Body() dto: CreateCriancaexpostahivDto) {
    return this.criancaexpostahivService.create(dto);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar registro de Criança Exposta por ID',
  })
  findOne(@Param('id') id: string) {
    return this.criancaexpostahivService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar registro de Criança Exposta',
  })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCriancaexpostahivDto,
    // pronto para uso futuro:
    // @UserContext() user: UserContextService,
  ) {
    return this.criancaexpostahivService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Deletar registro de Criança Exposta',
  })
  remove(@Param('id') id: string) {
    return this.criancaexpostahivService.remove(+id);
  }
}

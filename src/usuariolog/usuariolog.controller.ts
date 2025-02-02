import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuariologService } from './usuariolog.service';
import { CreateUsuariologDto } from './dto/create-usuariolog.dto';
import { UpdateUsuariologDto } from './dto/update-usuariolog.dto';
import { JwtGuard } from './../auth/auth/jwt.guard'; // Guard de Autenticação JWT
import { TenantGuard } from './../tenant/tenant.guard'; // Guard de Tenant (verificação de acesso)
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; // Para a documentação OpenAPI

@ApiTags('Log de') // Define o grupo de tags para a documentação OpenAPI
@Controller('usuariolog')
export class UsuariologController {
  constructor(private readonly usuariologService: UsuariologService) {}

  @Post()
  create(@Body() createUsuariologDto: CreateUsuariologDto) {
    return this.usuariologService.create(createUsuariologDto);
  }

  @Get()
  findAll() {
    return this.usuariologService.findAll();
  }

  /*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariologService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuariologDto: UpdateUsuariologDto) {
    return this.usuariologService.update(+id, updateUsuariologDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariologService.remove(+id);
  }
  */ 
  
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtGuard } from './../auth/auth/jwt.guard'; // Guard de Autenticação JWT
import { TenantGuard } from './../tenant/tenant.guard'; // Guard de Tenant (verificação de acesso)
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; // Para a documentação OpenAPI


@ApiTags('Desfecho Criança Exposta ao HIV') // Define o grupo de tags para a documentação OpenAPI
@Controller('usuario')
export class UsuarioController {
  constructor(
    private readonly usuarioService: UsuarioService) {}


  // Endpoint para verificar se o username existe
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Get('verify-username/:username')
  async verifyUsername(@Param('username') username: string) {
    const user = await this.usuarioService.findByUsername(username);
    return user;
  }


  // Rota para criar ou atualizar um registro de usuario
  @UseGuards(JwtGuard, TenantGuard) // Protege com JwtGuard e TenantGuard
  @Post()
  @ApiOperation({ summary: 'Criar ou atualizar um usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  async createOrUpdate(@Body() createUsuarioDto: CreateUsuarioDto) {
    // Verifica se o usuário já existe
    const userExists = await this.usuarioService.findByUsername(createUsuarioDto.username);

    if (userExists) {
      // Se o usuário já existe, atualiza o registro
      return this.usuarioService.update(userExists.id, createUsuarioDto); // Atualiza o usuário com base no ID
    } else {
      // Se o usuário não existe, cria um novo
      return this.usuarioService.create(createUsuarioDto); 
    }
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}

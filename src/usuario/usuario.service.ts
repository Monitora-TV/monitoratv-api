import { Inject, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/database/prisma.service'; // Prisma para interação com o banco
import { TenantService } from 'src/tenant/tenant/tenant.service'; // Serviço de Tenant (acesso controlado)

@Injectable()
export class UsuarioService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject()
  private readonly tenantService: TenantService;

  // Função para verificar se o usuário existe com base no username
  async findByUsername(username: string) {
    return this.prisma.tb_usuario.findFirst({
      where: {
        username: username, // Busca pelo campo 'username'
      },
    });
  }

/*
  async findOne(id: number) {
    return this.prisma.tb_usuario.findUnique({
      where: { id },
    });
  }
*/    


  // Método para criar um novo registro
  async create(createUsuarioDto: CreateUsuarioDto) {
    // Cria um novo usuário com data de primeiro acesso
    return this.prisma.tb_usuario.create({
      data: {
        ...createUsuarioDto,
        dt_primeiro_acesso: new Date(), // Define a data de primeiro acesso
      },
    });
  }

  // Método para atualizar um registro
  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    // Atualiza o registro de usuário com base no ID, sem atualizar o campo 'dt_primeiro_acesso'
    return this.prisma.tb_usuario.update({
      where: { id },
      data: {
        ...updateUsuarioDto,
        // Não atualiza o campo 'dt_primeiro_acesso'
      },
    });
  }

  // Método para obter todos os registros
  async findAll() {
    return this.prisma.tb_usuario.findMany();
  }

  // Método para encontrar um registro específico por id
  async findOne(id: number) {
    return this.prisma.tb_usuario.findUnique({
      where: { id },
    });
  }

  // Método para remover um registro
  async remove(id: number) {
    return this.prisma.tb_usuario.delete({
      where: { id },
    });
  }
}

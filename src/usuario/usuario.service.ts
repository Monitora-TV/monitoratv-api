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

  // Método para criar um novo registro
  async create(createUsuarioDto: CreateUsuarioDto) {
    const existingRecord = await this.prisma.tb_usuario.findFirst({
      where: {
        email: createUsuarioDto.email, // Verifica se o 'email' já existe
      },
    });

    if (existingRecord) {
      throw new Error('Já existe um usuario com esse email.');
    }

    const newRecord = await this.prisma.tb_usuario.create({
      data: createUsuarioDto,
    });

    return newRecord;
  }



  findAll() {
    return `This action returns all usuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}

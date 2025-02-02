import { Inject, Injectable } from '@nestjs/common';
import { CreateUsuariologDto } from './dto/create-usuariolog.dto';
//import { UpdateUsuariologDto } from './dto/update-usuariolog.dto';
import { PrismaService } from 'src/database/prisma.service'; // Prisma para interação com o banco
import { TenantService } from 'src/tenant/tenant/tenant.service'; // Serviço de Tenant (acesso controlado)
import { AuthenticatedUser, Public, Roles, RoleMatchingMode } from 'nest-keycloak-connect';
import { UsuarioService } from 'src/usuario/usuario.service';


@Injectable()
export class UsuariologService {  
  @Inject()  private readonly prisma: PrismaService;
  @Inject()  private readonly tenantService: TenantService;
  @Inject()  private readonly usuarioService: UsuarioService; // Injetando o serviço de logs
  
  getUserName(
    @AuthenticatedUser()
    user: any,
  ): string {
    if (user) {
      return user.preferred_username;
    } else {
      return null;
    }
  }
    


  async logAction(tipo_operacao: string, entity: string, entityid: number, detalhe: string | null = null) {
    
    await this.prisma.tb_usuario_log.create(
      {
        data: {
          tipo_operacao,
          entity,
          entityid,
          detalhe,
        },
      });
  }



  async create(createUsuariologDto: CreateUsuariologDto) {createUsuariologDto};

  // Método para obter todos os registros
  async findAll() {
    return await this.prisma.tb_usuario_log.findMany();
  }

}


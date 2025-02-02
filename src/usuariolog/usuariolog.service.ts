import { Inject, Injectable } from '@nestjs/common';
import { CreateUsuariologDto } from './dto/create-usuariolog.dto';
import { PrismaService } from 'src/database/prisma.service'; // Prisma para interação com o banco
import { TenantService } from 'src/tenant/tenant/tenant.service'; // Serviço de Tenant (acesso controlado)
import { AuthenticatedUser, Public, Roles, RoleMatchingMode } from 'nest-keycloak-connect';

@Injectable()
export class UsuariologService {  
  @Inject()  private readonly prisma: PrismaService;
  @Inject()  private readonly tenantService: TenantService;
  // Iniciando o servidor


  //await this.usuariologService.logAction(userKeycloak.sub, userKeycloak.preferred_username, 'Update', 'CriancaExpostaHiv', id, `Atualizado registro de criança exposta HIV com ID: ${id}`);

  async logAction(userid_keycloak: string, username: string, tipo_operacao: string, entity: string, entityid: number, detalhe: string | null = null) {

    await this.prisma.tb_usuario_log.create(
      {
        data: {
          userid_keycloak,
          username,
          tipo_operacao,
          entity,
          entityid,
          detalhe,
          dt_operacao: new Date(), // Define a data da operaçao
        },
      });
  }

  // Método para criar um novo registro
  /*
  async create(createUsuarioDto: CreateUsuarioDto) {
    // Cria um novo usuário com data de primeiro acesso
    return this.prisma.tb_usuario.create({
      data: {
        ...createUsuarioDto,
        dt_primeiro_acesso: new Date(), // Define a data de primeiro acesso
        dt_ultimo_acesso: new Date(), // Define a data de primeiro acesso
      },
    });
  }
    */


    /*
      id_usuario		int4 null,
      userId_keycloak  	varchar(36) NULL,	-- Relaciona com o id do usuário	
    username 			varchar(255) NULL,  	-- Adiciona a restrição de unicidade
    tipo_operacao	varchar(20) NULL,  			-- Tipo de operação (Create, Update, Delete, Read)
    entity		varchar(200) NULL,			-- Entidade que foi modificada (Ex: "CriancaExpostaHiv")
    entityId		Int4 null,  				-- ID do registro afetado
    detalhe    	text null,					-- Informações adicionais (opcional)
    dt_operacao 	timestamp null  			-- Data e hora da operação
    */


  async create(createUsuariologDto: CreateUsuariologDto) {createUsuariologDto};

  // Método para obter todos os registros
  async findAll() {
    return await this.prisma.tb_usuario_log.findMany();
  }

}


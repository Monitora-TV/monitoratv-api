import { Module } from '@nestjs/common';
import { DesfechocriancaexpostahivService } from './desfechocriancaexpostahiv.service';
import { DesfechocriancaexpostahivController } from './desfechocriancaexpostahiv.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthenticationModule } from '../authentication/authentication.module';


@Module({
  imports: [PrismaModule, AuthenticationModule],
  controllers: [DesfechocriancaexpostahivController],
  providers: [DesfechocriancaexpostahivService],
})
export class DesfechocriancaexpostahivModule {}

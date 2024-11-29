import { Module } from '@nestjs/common';
import { DesfechocriancaexpostahivService } from './desfechocriancaexpostahiv.service';
import { DesfechocriancaexpostahivController } from './desfechocriancaexpostahiv.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AuthenticationModule } from '../authentication/authentication.module';


@Module({
  imports: [DatabaseModule, AuthenticationModule],
  controllers: [DesfechocriancaexpostahivController],
  providers: [DesfechocriancaexpostahivService],
})
export class DesfechocriancaexpostahivModule {}

import { Module } from '@nestjs/common';
import { DesfechocriancaexpostahivService } from './desfechocriancaexpostahiv.service';
import { DesfechocriancaexpostahivController } from './desfechocriancaexpostahiv.controller';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports: [DatabaseModule],
  controllers: [DesfechocriancaexpostahivController],
  providers: [DesfechocriancaexpostahivService],
})
export class DesfechocriancaexpostahivModule {}

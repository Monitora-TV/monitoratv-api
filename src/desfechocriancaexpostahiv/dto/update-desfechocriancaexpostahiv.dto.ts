import { PartialType } from '@nestjs/mapped-types';
import { CreateDesfechocriancaexpostahivDto } from './create-desfechocriancaexpostahiv.dto';

export class UpdateDesfechocriancaexpostahivDto extends PartialType(CreateDesfechocriancaexpostahivDto) {}


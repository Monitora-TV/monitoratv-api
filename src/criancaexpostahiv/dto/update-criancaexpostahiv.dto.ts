import { PartialType } from '@nestjs/mapped-types';
import { CreateCriancaexpostahivDto } from './create-criancaexpostahiv.dto';

export class UpdateCriancaexpostahivDto extends PartialType(CreateCriancaexpostahivDto) {}

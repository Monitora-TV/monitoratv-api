import { PartialType } from '@nestjs/swagger';
import { CreateMaternidadeDto } from './create-maternidade.dto';

export class UpdateMaternidadeDto extends PartialType(CreateMaternidadeDto) {}


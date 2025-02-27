import { PartialType } from '@nestjs/swagger';
import { CreateTbperiodoarvnascimentoDto } from './create-tbperiodoarvnascimento.dto';

export class UpdateTbperiodoarvnascimentoDto extends PartialType(CreateTbperiodoarvnascimentoDto) {}

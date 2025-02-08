import { PartialType } from '@nestjs/swagger';
import { CreateTbexamehivelisaibDto } from './create-tbexamehivelisaib.dto';

export class UpdateTbexamehivelisaibDto extends PartialType(CreateTbexamehivelisaibDto) {}

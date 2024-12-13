import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadesaudeDto } from './create-unidadesaude.dto';

export class UpdateUnidadesaudeDto extends PartialType(CreateUnidadesaudeDto) {}


import { PartialType } from '@nestjs/swagger';
import { CreateTbunidadesaudeDto } from './create-tbunidadesaude.dto';

export class UpdateTbunidadesaudeDto extends PartialType(CreateTbunidadesaudeDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateUnidadesaudesaeDto } from './create-unidadesaudesae.dto';

export class UpdateUnidadesaudesaeDto extends PartialType(CreateUnidadesaudesaeDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateTbtiporesultadocargaviralDto } from './create-tbtiporesultadocargaviral.dto';

export class UpdateTbtiporesultadocargaviralDto extends PartialType(CreateTbtiporesultadocargaviralDto) {}

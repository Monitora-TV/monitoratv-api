import { PartialType } from '@nestjs/swagger';
import { CreateTbtiporesultadoelisaDto } from './create-tbtiporesultadoelisa.dto';

export class UpdateTbtiporesultadoelisaDto extends PartialType(CreateTbtiporesultadoelisaDto) {}

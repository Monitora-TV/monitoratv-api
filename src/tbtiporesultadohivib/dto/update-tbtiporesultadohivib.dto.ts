import { PartialType } from '@nestjs/swagger';
import { CreateTbtiporesultadohivibDto } from './create-tbtiporesultadohivib.dto';

export class UpdateTbtiporesultadohivibDto extends PartialType(CreateTbtiporesultadohivibDto) {}

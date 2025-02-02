import { PartialType } from '@nestjs/swagger';
import { CreateUsuariologDto } from './create-usuariolog.dto';

export class UpdateUsuariologDto extends PartialType(CreateUsuariologDto) {}


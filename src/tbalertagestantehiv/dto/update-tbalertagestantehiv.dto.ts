import { PartialType } from '@nestjs/swagger';
import { CreateTbalertagestantehivDto } from './create-tbalertagestantehiv.dto';

export class UpdateTbalertagestantehivDto extends PartialType(CreateTbalertagestantehivDto) {}

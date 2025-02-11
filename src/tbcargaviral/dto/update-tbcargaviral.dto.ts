import { PartialType } from '@nestjs/swagger';
import { CreateTbcargaviralDto } from './create-tbcargaviral.dto';

export class UpdateTbcargaviralDto extends PartialType(CreateTbcargaviralDto) {}

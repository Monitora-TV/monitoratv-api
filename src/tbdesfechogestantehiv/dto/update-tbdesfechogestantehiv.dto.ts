import { PartialType } from '@nestjs/swagger';
import { CreateTbdesfechogestantehivDto } from './create-tbdesfechogestantehiv.dto';

export class UpdateTbdesfechogestantehivDto extends PartialType(CreateTbdesfechogestantehivDto) {}

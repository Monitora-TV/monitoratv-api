import { PartialType } from '@nestjs/mapped-types';
import { CreateCoordenadoriaDto } from './create-coordenadoria.dto';

export class UpdateCoordenadoriaDto extends PartialType(CreateCoordenadoriaDto) {}

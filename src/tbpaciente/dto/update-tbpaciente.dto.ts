import { PartialType } from '@nestjs/swagger';
import { CreateTbpacienteDto } from './create-tbpaciente.dto';

export class UpdateTbpacienteDto extends PartialType(CreateTbpacienteDto) {}

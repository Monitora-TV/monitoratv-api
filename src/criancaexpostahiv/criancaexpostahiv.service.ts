import { Injectable } from '@nestjs/common';
import { CreateCriancaexpostahivDto } from './dto/create-criancaexpostahiv.dto';
import { UpdateCriancaexpostahivDto } from './dto/update-criancaexpostahiv.dto';

@Injectable()
export class CriancaexpostahivService {
  create(createCriancaexpostahivDto: CreateCriancaexpostahivDto) {
    return 'This action adds a new criancaexpostahiv';
  }

  findAll() {
    return `This action returns all criancaexpostahiv`;
  }

  findOne(id: number) {
    return `This action returns a #${id} criancaexpostahiv`;
  }

  update(id: number, updateCriancaexpostahivDto: UpdateCriancaexpostahivDto) {
    return `This action updates a #${id} criancaexpostahiv`;
  }

  remove(id: number) {
    return `This action removes a #${id} criancaexpostahiv`;
  }
}

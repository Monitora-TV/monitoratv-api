import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CoordenadoriaService } from './coordenadoria.service';
import { CreateCoordenadoriaDto } from './dto/create-coordenadoria.dto';
import { UpdateCoordenadoriaDto } from './dto/update-coordenadoria.dto';

@Controller('coordenadoria')
export class CoordenadoriaController {
  constructor(private readonly coordenadoriaService: CoordenadoriaService) {}

  @Post()
  create(@Body() createCoordenadoriaDto: CreateCoordenadoriaDto) {
    return this.coordenadoriaService.create(createCoordenadoriaDto);
  }

  @Get()
  findAll() {
    return this.coordenadoriaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coordenadoriaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoordenadoriaDto: UpdateCoordenadoriaDto) {
    return this.coordenadoriaService.update(+id, updateCoordenadoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coordenadoriaService.remove(+id);
  }
}

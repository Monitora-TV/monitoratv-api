import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CriancaexpostahivService } from './criancaexpostahiv.service';
import { CreateCriancaexpostahivDto } from './dto/create-criancaexpostahiv.dto';
import { UpdateCriancaexpostahivDto } from './dto/update-criancaexpostahiv.dto';

@Controller('criancaexpostahiv')
export class CriancaexpostahivController {
  constructor(private readonly criancaexpostahivService: CriancaexpostahivService) {}

  @Post()
  create(@Body() createCriancaexpostahivDto: CreateCriancaexpostahivDto) {
    return this.criancaexpostahivService.create(createCriancaexpostahivDto);
  }

  @Get()
  findAll() {
    return this.criancaexpostahivService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.criancaexpostahivService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCriancaexpostahivDto: UpdateCriancaexpostahivDto) {
    return this.criancaexpostahivService.update(+id, updateCriancaexpostahivDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.criancaexpostahivService.remove(+id);
  }
}

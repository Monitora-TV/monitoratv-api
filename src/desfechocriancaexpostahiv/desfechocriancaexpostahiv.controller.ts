import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DesfechocriancaexpostahivService } from './desfechocriancaexpostahiv.service';
import { CreateDesfechocriancaexpostahivDto } from './dto/create-desfechocriancaexpostahiv.dto';
import { UpdateDesfechocriancaexpostahivDto } from './dto/update-desfechocriancaexpostahiv.dto';
import { AuthenticationGuard } from '../authentication/authentication.guard';

@Controller('desfechocriancaexpostahiv')
export class DesfechocriancaexpostahivController {
  constructor(private readonly desfechocriancaexpostahivService: DesfechocriancaexpostahivService) {}

  @Post()
  create(@Body() createDesfechocriancaexpostahivDto: CreateDesfechocriancaexpostahivDto) {
    return this.desfechocriancaexpostahivService.create(createDesfechocriancaexpostahivDto);
  }

  @Get()
  @UseGuards(AuthenticationGuard)
  findAll() {
    return this.desfechocriancaexpostahivService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.desfechocriancaexpostahivService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDesfechocriancaexpostahivDto: UpdateDesfechocriancaexpostahivDto) {
    return this.desfechocriancaexpostahivService.update(+id, updateDesfechocriancaexpostahivDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.desfechocriancaexpostahivService.remove(+id);
  }
}

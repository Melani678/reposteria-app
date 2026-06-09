import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../cloudinary.config';

import { CarouselService } from './carousel.service';

@Controller('carousel')
export class CarouselController {
  constructor(private service: CarouselService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('imagen', { storage }))
  create(
    @Body() body: any,
    @UploadedFile() file: any,
  ) {
    return this.service.create({
      nombre: body.nombre ?? 'slide',
      imagen: file ? file.path : null,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }

  @Patch('reorder')
  reorder(@Body() body: any) {
    return this.service.reorder(body);
  }
}
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
import { diskStorage } from 'multer';
import { extname } from 'path';

import { CarouselService } from './carousel.service';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = extname(file.originalname);
    cb(null, `carousel-${unique}${ext}`);
  },
});

@Controller('carousel')
export class CarouselController {
  constructor(private service: CarouselService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('imagen', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique =
            Date.now() + '-' + Math.round(Math.random() * 1e9);

          const ext = extname(file.originalname);

          cb(null, `carousel-${unique}${ext}`);
        },
      }),
    }),
  )
  create(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.create({
      nombre: body.nombre ?? 'slide',
      imagen: file ? `/uploads/${file.filename}` : null,
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
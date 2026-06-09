import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common';

import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, callback) => {
    const uniqueSuffix =
      Date.now() + '-' + Math.round(Math.random() * 1e9);

    const ext = extname(file.originalname);

    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});
@Controller('productos')
export class ProductosController {

  constructor(
    private readonly productosService:
      ProductosService,
  ) {}

  @Get()
  findAll() {
    return this.productosService.findAll();
  }
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ){
    return this.productosService.findOne(
        Number(id),
    );
  }
  @Post()
  @UseInterceptors(FileInterceptor('imagen', { storage }))
  create(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const createProductoDto: CreateProductoDto = {
      ...body,
      precio: Number(body.precio),
      stock: body.stock === '' ? null : Number(body.stock),
      activo: body.activo === 'true' || body.activo === true,

      cantidad_pisos: body.cantidad_pisos
        ? Number(body.cantidad_pisos)
        : undefined,

      cantidad_personas: body.cantidad_personas
        ? Number(body.cantidad_personas)
        : undefined,

      permite_personalizacion_imagen:
        body.permite_personalizacion_imagen === 'true' ||
        body.permite_personalizacion_imagen === true,

      permite_color_crema:
        body.permite_color_crema === 'true' ||
        body.permite_color_crema === true,
    };

    if (file) {
      createProductoDto.imagen = `/uploads/${file.filename}`;
    }

    return this.productosService.create(createProductoDto);
  }
  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen', { storage }))
  update(
    @Param('id') id: string,
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const updateProductoDto: UpdateProductoDto = {
      ...body,
      precio: body.precio ? Number(body.precio) : undefined,
      stock:
        body.stock === '' ? null : body.stock ? Number(body.stock) : undefined,

      cantidad_pisos: body.cantidad_pisos
        ? Number(body.cantidad_pisos)
        : undefined,

      cantidad_personas: body.cantidad_personas
        ? Number(body.cantidad_personas)
        : undefined,

      permite_personalizacion_imagen:
        body.permite_personalizacion_imagen === 'true',

      permite_color_crema:
        body.permite_color_crema === 'true',
    };

    if (file) {
      updateProductoDto.imagen = `/uploads/${file.filename}`;
    }

    return this.productosService.update(Number(id), updateProductoDto);
  }
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {

    return this.productosService.remove(
      Number(id),
    );

  }
}
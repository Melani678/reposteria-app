import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductosController } from './productos.controller';

import { ProductosService } from './productos.service';

import { Producto } from './entities/producto.entity';

import { Torta } from './entities/torta.entity';
import { Cupcake } from './entities/cupcake.entity';
import { Galleta } from './entities/galleta.entity';
import { Queque } from './entities/queque.entity';
import { Postre } from './entities/postre.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Producto,
      Torta,
      Cupcake,
      Galleta,
      Queque,
      Postre,
    ]),
  ],

  controllers: [
    ProductosController,
  ],

  providers: [
    ProductosService,
  ],
})
export class ProductosModule {}
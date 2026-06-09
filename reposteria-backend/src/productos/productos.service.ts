import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Producto } from './entities/producto.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

import { Torta } from './entities/torta.entity';
import { Cupcake } from './entities/cupcake.entity';
import { Galleta } from './entities/galleta.entity';
import { Queque } from './entities/queque.entity';
import { Postre } from './entities/postre.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>,
    @InjectRepository(Torta)
    private tortaRepository: Repository<Torta>,

    @InjectRepository(Cupcake)
    private cupcakeRepository: Repository<Cupcake>,

    @InjectRepository(Galleta)
    private galletaRepository: Repository<Galleta>,

    @InjectRepository(Queque)
    private quequeRepository: Repository<Queque>,

    @InjectRepository(Postre)
    private postreRepository: Repository<Postre>,
  ) {}
  async findAll() {

    return await this.productoRepository.find({

      relations: {
        torta: true,
        cupcake: true,
        galleta: true,
        queque: true,
        postre: true,
      },

    });

  }
  async findOne(id: number) {

    return await this.productoRepository.findOne({
      where: {
        id_producto: id,
      },

      relations: {
        torta: true,
        cupcake: true,
        galleta: true,
        queque: true,
        postre: true,
      },
    });

  }
  
  async create(
    
    createProductoDto: CreateProductoDto,
  ) {
    console.log(createProductoDto);
    if (
      createProductoDto.tipo !== 'TORTA' &&
      createProductoDto.stock == null
    ) {
      throw new BadRequestException(
        'El stock es obligatorio',
      );
    }

    if (createProductoDto.tipo === 'TORTA') {
      createProductoDto.stock = null;
    }


    const producto =
      this.productoRepository.create({
        nombre: createProductoDto.nombre,
        descripcion: createProductoDto.descripcion,
        ingredientes: createProductoDto.ingredientes,
        precio: createProductoDto.precio,
        imagen: createProductoDto.imagen,
        stock: createProductoDto.stock,
        activo: createProductoDto.activo,
        tipo_venta: createProductoDto.tipo_venta,
        tipo: createProductoDto.tipo,
      });

    const productoGuardado =
      await this.productoRepository.save(
        producto,
      );

    switch (createProductoDto.tipo) {

      case 'TORTA':

        await this.tortaRepository.save({
          id_producto:
            productoGuardado.id_producto,

          cantidad_pisos:
            createProductoDto.cantidad_pisos ?? 1,

          cantidad_personas:
            createProductoDto.cantidad_personas ?? 0,

          forma_torta:
            createProductoDto.forma_torta ?? 'CIRCULO',

          permite_personalizacion_imagen:
            createProductoDto.permite_personalizacion_imagen ?? false,
        });

        break;

      case 'CUPCAKE':

        await this.cupcakeRepository.save({
          id_producto:
            productoGuardado.id_producto,

          permite_color_crema:
            createProductoDto.permite_color_crema ?? false,
        });

        break;

      case 'GALLETA':

        await this.galletaRepository.save({
          id_producto:
            productoGuardado.id_producto,

          sabor:
            createProductoDto.sabor_galleta ?? '',
        });

        break;

      case 'QUEQUE':

        await this.quequeRepository.save({
          id_producto:
            productoGuardado.id_producto,

          sabor:
            createProductoDto.sabor_queque ?? '',
        });

        break;

      case 'POSTRE':

        await this.postreRepository.save({
          id_producto:
            productoGuardado.id_producto,
        });

        break;
    }

    return productoGuardado;
  }
  async update(
    id: number,
    updateProductoDto: UpdateProductoDto,
  ) {

    const {
      cantidad_pisos,
      cantidad_personas,
      forma_torta,
      permite_personalizacion_imagen,

      permite_color_crema,

      sabor_galleta,

      sabor_queque,

      ...productoData

    } = updateProductoDto;

    await this.productoRepository.update(
      { id_producto: id },
      productoData,
    );

    const producto =
      await this.productoRepository.findOne({
        where: {
          id_producto: id,
        },
      });

    if (!producto) {
      throw new BadRequestException(
        'Producto no encontrado',
      );
    }

    switch (producto.tipo) {

      case 'TORTA':

        await this.tortaRepository.update(
          { id_producto: id },
          {
            cantidad_pisos,
            cantidad_personas,
            forma_torta,
            permite_personalizacion_imagen,
          },
        );

        break;

      case 'CUPCAKE':

        await this.cupcakeRepository.update(
          { id_producto: id },
          {
            permite_color_crema,
          },
        );

        break;

      case 'GALLETA':

        await this.galletaRepository.update(
          { id_producto: id },
          {
            sabor: sabor_galleta,
          },
        );

        break;

      case 'QUEQUE':

        await this.quequeRepository.update(
          { id_producto: id },
          {
            sabor: sabor_queque,
          },
        );

        break;
    }

    return this.findOne(id);
  }
  async remove(id: number) {

      // obtener producto con relaciones (usas findOne tuyo)
      const producto = await this.findOne(id);

      if (!producto) {
        throw new BadRequestException('Producto no encontrado');
      }

      // =========================
      //  BORRAR RELACIONES
      // =========================
      switch (producto.tipo) {

        case 'TORTA':
          await this.tortaRepository.delete({ id_producto: id });
          break;

        case 'CUPCAKE':
          await this.cupcakeRepository.delete({ id_producto: id });
          break;

        case 'GALLETA':
          await this.galletaRepository.delete({ id_producto: id });
          break;

        case 'QUEQUE':
          await this.quequeRepository.delete({ id_producto: id });
          break;

        case 'POSTRE':
          await this.postreRepository.delete({ id_producto: id });
          break;
      }

      // =========================
      //  BORRAR IMAGEN FÍSICA
      // =========================
      if (producto.imagen) {
        try {
          const filePath = path.join(
            process.cwd(),
            producto.imagen.startsWith('/')
              ? producto.imagen.slice(1)
              : producto.imagen,
          );

          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }

        } catch (error) {
          if (error instanceof Error) {
            console.log('Error eliminando imagen:', error.message);
          } else {
            console.log('Error eliminando imagen:', error);
          }
      }

      // =========================
      //  BORRAR PRODUCTO
      // =========================
      await this.productoRepository.delete({
        id_producto: id,
      });

      return {
        message: 'Producto eliminado correctamente',
      };
    }
  }
}
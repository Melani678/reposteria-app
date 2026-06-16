import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from '../productos/entities/producto.entity';
import { Cliente } from '../entities/cliente.entity';
import { Compra } from '../compras/entities/compra.entity';

@Injectable()
export class ReportesService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,

    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,

    @InjectRepository(Compra)
    private compraRepo: Repository<Compra>,
  ) {}

  async getResumen() {
    const productos = await this.productoRepo.count({ where: { activo: true } });
    const clientes = await this.clienteRepo
      .createQueryBuilder('c')
      .innerJoin('c.usuario', 'u')
      .where('u.rol = :rol', { rol: 'cliente' })
      .getCount();
    const pedidos = await this.compraRepo.count();

    const ventas = await this.compraRepo
      .createQueryBuilder('c')
      .select('SUM(c.total)', 'total')
      .getRawOne();

    return {
      productos,
      clientes,
      pedidos,
      ventas: Number(ventas.total || 0),
    };
  }
  
}
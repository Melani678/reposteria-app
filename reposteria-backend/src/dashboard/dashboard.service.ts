import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Producto } from '../productos/entities/producto.entity';
import { Cliente } from '../entities/cliente.entity';
import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,

    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,

    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async getStats() {

    // 📦 productos
    const productos = await this.productoRepo.count();

    // 👥 clientes (solo usuarios con rol cliente)
    const clientes = await this.usuarioRepo.count({
      where: { rol: 'cliente' },
    });

    //  ventas (por ahora 0 porque no usas pedidos)
    const ventas = 0;

    // pedidos (lo quitaste, queda 0 o puedes eliminar luego)
    const pedidos = 0;

    return {
      productos,
      clientes,
      pedidos,
      ventas,
    };
  }
}
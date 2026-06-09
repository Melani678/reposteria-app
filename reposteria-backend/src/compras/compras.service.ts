import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compra } from './entities/compra.entity';
import { DetalleCompra } from './entities/detalle-compra.entity';
import { Cliente } from '../entities/cliente.entity';
import { Producto } from '../productos/entities/producto.entity';

@Injectable()
export class ComprasService {
  constructor(
    @InjectRepository(Compra)
    private compraRepo: Repository<Compra>,

    @InjectRepository(DetalleCompra)
    private detalleRepo: Repository<DetalleCompra>,

    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,

    @InjectRepository(Producto)
    private productoRepo: Repository<Producto>,
  ) {}

  // =========================
  // CREAR COMPRA
  // =========================
  async crearCompra(user: any, data: any) {
    const { items, total } = data;

    console.log('USER JWT:', user);

    // =========================
    // BUSCAR CLIENTE
    // =========================
    const clienteDB = await this.clienteRepo
      .createQueryBuilder('cliente')
      .innerJoin('cliente.usuario', 'usuario')
      .where('usuario.id_usuario = :id', { id: user.id_usuario })
      .getOne();

    if (!clienteDB) {
      throw new Error('Cliente no encontrado');
    }

    console.log('CLIENTE FOUND:', clienteDB);

    // =========================
    // CREAR COMPRA
    // =========================
    const nuevaCompra = this.compraRepo.create({
      id_cliente: clienteDB.id_cliente,
      fecha_compra: new Date(),
      total,
      estado_pago: 'PENDIENTE',
      metodo_pago: 'QR',
      estado_pedido: 'PENDIENTE',
    });

    const compraGuardada = await this.compraRepo.save(nuevaCompra);

    console.log('COMPRA GUARDADA:', compraGuardada);

    // =========================
    // DETALLES DE COMPRA
    // =========================
    for (const item of items) {

        // 1. Buscar producto
        const producto = await this.productoRepo.findOne({
            where: { id_producto: Number(item.id) }
        });

        if (!producto) {
            throw new Error(`Producto no encontrado: ${item.id}`);
        }

        // 2. Validar stock
        const stockActual = Number(producto.stock ?? 0);

        if (stockActual < Number(item.quantity)) {
            throw new Error(
            `Stock insuficiente para ${producto.nombre}`
            );
        }

        // 3. Descontar stock
        producto.stock = stockActual - Number(item.quantity);

        // 4. Guardar producto actualizado
        await this.productoRepo.save(producto);

        // 5. Guardar detalle de compra
        await this.detalleRepo.save({
            compra: { id_compra: compraGuardada.id_compra },
            producto: { id_producto: producto.id_producto },
            cantidad: Number(item.quantity),
            precio_unitario: Number(item.price),
            subtotal: Number(item.price) * Number(item.quantity),
        });
        }

    return compraGuardada;
  }

  // =========================
  // LISTAR COMPRAS
  // =========================
  findAll() {
    return this.compraRepo.find({
      relations: {
        detalles: true,
      },
    });
  }

  // =========================
  // COUNT COMPRAS
  // =========================
  count() {
    return this.compraRepo.count();
  }

  // =========================
  // TOTAL VENTAS
  // =========================
  totalVentas() {
    return this.compraRepo
      .createQueryBuilder('c')
      .select('SUM(c.total)', 'total')
      .getRawOne();
  }
}
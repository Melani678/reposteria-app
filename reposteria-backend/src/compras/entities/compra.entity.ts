import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { DetalleCompra } from './detalle-compra.entity';

@Entity('compra')
export class Compra {
  @PrimaryGeneratedColumn({ name: 'id_compra' })
  id_compra!: number;

  @Column({ name: 'id_cliente' })
  id_cliente!: number;

  @Column({ type: 'datetime' })
  fecha_compra!: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total!: number;

  @Column({
    type: 'enum',
    enum: ['PENDIENTE', 'PAGADO', 'ANULADO'],
  })
  estado_pago!: string;

  @Column({
    type: 'enum',
    enum: ['QR', 'EFECTIVO', 'TRANSFERENCIA'],
  })
  metodo_pago!: string;

  @Column({
    type: 'enum',
    enum: ['PENDIENTE', 'CONFIRMADO', 'EN_PREPARACION', 'LISTO', 'ENTREGADO', 'CANCELADO'],
  })
  estado_pedido!: string;

  @Column({ type: 'datetime', nullable: true })
  fecha_entrega!: Date;

  @OneToMany(() => DetalleCompra, (d) => d.compra)
  detalles!: DetalleCompra[];
}
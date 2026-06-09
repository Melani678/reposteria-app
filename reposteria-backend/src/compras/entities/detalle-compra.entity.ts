import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Compra } from './compra.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Entity('detalle_compra')
export class DetalleCompra {
  @PrimaryGeneratedColumn({ name: 'id_detalle_compra' })
  id_detalle_compra!: number;

  @Column({ name: 'id_producto' })
  id_producto!: number;

  @Column({ name: 'id_sabor_relleno', nullable: true })
  id_sabor_relleno!: number;

  @Column()
  cantidad!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio_unitario!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal!: number;

  @Column({ nullable: true })
  color_crema!: string;

  @ManyToOne(() => Compra, (c) => c.detalles)
    @JoinColumn({ name: 'id_compra' })
    compra!: Compra;

    @ManyToOne(() => Producto)
    @JoinColumn({ name: 'id_producto' })
    producto!: Producto;
}
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';

import { Torta } from './torta.entity';
import { Cupcake } from './cupcake.entity';
import { Galleta } from './galleta.entity';
import { Queque } from './queque.entity';
import { Postre } from './postre.entity';

@Entity('producto')
export class Producto {

  @PrimaryGeneratedColumn()
  id_producto!: number;

  @Column()
  nombre!: string;

  @Column('text')
  descripcion!: string;

  @Column('text')
  ingredientes!: string;

  @Column('decimal')
  precio!: number;

  @Column()
  imagen!: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  stock!: number | null;

  @Column()
  activo!: boolean;

  @Column()
  tipo_venta!: string;

  @Column()
  tipo!: string;

  @OneToOne(
    () => Torta,
    torta => torta.producto,
  )
  torta?: Torta;

  @OneToOne(
    () => Cupcake,
    cupcake => cupcake.producto,
  )
  cupcake?: Cupcake;

  @OneToOne(
    () => Galleta,
    galleta => galleta.producto,
  )
  galleta?: Galleta;

  @OneToOne(
    () => Queque,
    queque => queque.producto,
  )
  queque?: Queque;

  @OneToOne(
    () => Postre,
    postre => postre.producto,
  )
  postre?: Postre;
}
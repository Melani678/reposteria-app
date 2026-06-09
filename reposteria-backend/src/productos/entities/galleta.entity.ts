import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Producto } from './producto.entity';

@Entity('galleta')
export class Galleta {

  @PrimaryColumn()
  id_producto!: number;

  @OneToOne(
    () => Producto,
    producto => producto.galleta,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'id_producto',
  })
  producto!: Producto;

  @Column()
  sabor!: string;
}
import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Producto } from './producto.entity';

@Entity('cupcake')
export class Cupcake {

  @PrimaryColumn()
  id_producto!: number;

  @OneToOne(
    () => Producto,
    producto => producto.cupcake,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'id_producto',
  })
  producto!: Producto;

  @Column()
  permite_color_crema!: boolean;
}
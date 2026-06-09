import {
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Producto } from './producto.entity';

@Entity('postre')
export class Postre {

  @PrimaryColumn()
  id_producto!: number;

  @OneToOne(
    () => Producto,
    producto => producto.postre,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'id_producto',
  })
  producto!: Producto;
}
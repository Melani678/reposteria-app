import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Producto } from './producto.entity';

@Entity('queque')
export class Queque {

  @PrimaryColumn()
  id_producto!: number;

  @OneToOne(
    () => Producto,
    producto => producto.queque,
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
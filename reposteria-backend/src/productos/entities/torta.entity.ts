import {
  Entity,
  PrimaryColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Producto } from './producto.entity';

@Entity('torta')
export class Torta {

  @PrimaryColumn()
  id_producto!: number;

  @OneToOne(
    () => Producto,
    producto => producto.torta,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'id_producto',
  })
  producto!: Producto;

  @Column()
  permite_personalizacion_imagen!: boolean;

  @Column()
  cantidad_pisos!: number;

  @Column()
  cantidad_personas!: number;

  @Column()
  forma_torta!: string;
}
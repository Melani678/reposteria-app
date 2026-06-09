import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Usuario } from './usuario.entity';

@Entity('cliente')
export class Cliente {

  @PrimaryGeneratedColumn({ name: 'id_cliente' })
  id_cliente!: number;

  @Column()
  puntos_compras!: number;

  @Column()
  id_usuario!: number;

  @OneToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario' })
  usuario!: Usuario;
}
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
} from 'typeorm';
import { Cliente } from './cliente.entity';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuario' })
  id_usuario!: number;

  @Column()
  nombre!: string;

  @Column()
  apellido!: string;

  @Column({ unique: true })
  correo!: string;

  @Column({ name: 'contraseña' })
  contraseña!: string;

  @Column()
  telefono!: string;

  @Column()
  direccion!: string;

  @Column()
  fecha_registro!: Date;

  @Column({
    type: 'enum',
    enum: ['admin', 'cliente'],
  })
  rol!: string;

  @OneToOne(() => Cliente, (cliente) => cliente.usuario)
  cliente!: Cliente;
}
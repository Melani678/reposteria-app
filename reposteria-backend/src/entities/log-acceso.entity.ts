import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('log_acceso')
export class LogAcceso {
  @PrimaryGeneratedColumn({ name: 'id_log' })
  id_log!: number;

  @Column()
  id_usuario!: number;

  @Column({
    type: 'enum',
    enum: ['ingreso', 'salida'],
  })
  evento!: string;

  @Column()
  ip!: string;

  @Column()
  navegador!: string;

  @Column()
  fecha_hora!: Date;
}
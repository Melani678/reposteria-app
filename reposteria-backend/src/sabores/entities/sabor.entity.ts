import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sabor_relleno')
export class SaborRelleno {

  @PrimaryGeneratedColumn({ name: 'id_sabor_relleno' })
  id_sabor_relleno!: number;

  @Column({ type: 'varchar', length: 50 })
  nombre!: string;
  @Column({ default: true })
  activo!: boolean;
}
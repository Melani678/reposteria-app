import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('carousel')
export class Carousel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  imagen!: string;

  @Column({ default: true })
  activo!: boolean;

  @Column()
  orden!: number;
}
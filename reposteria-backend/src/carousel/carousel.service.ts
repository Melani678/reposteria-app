import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carousel } from './entities/carousel.entity';

@Injectable()
export class CarouselService {
  constructor(
    @InjectRepository(Carousel)
    private repo: Repository<Carousel>,
  ) {}

  findAll() {
    return this.repo.find({
      order: { orden: 'ASC' },
    });
  }

  async create(data: any) {
    const count = await this.repo.count();

    const slide = this.repo.create({
      nombre: data.nombre || 'slide',
      imagen: data.imagen,
      activo: true,
      orden: count,
    });

    return this.repo.save(slide);
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }

  async reorder(slides: { id: number; orden: number }[]) {
    for (const s of slides) {
      await this.repo.update(s.id, { orden: s.orden });
    }
    return { ok: true };
  }
}
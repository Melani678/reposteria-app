import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaborRelleno } from './entities/sabor.entity';
import { CreateSaborDto } from './dto/create-sabor.dto';
import { UpdateSaborDto } from './dto/update-sabor.dto';

@Injectable()
export class SaboresService {

  constructor(
    @InjectRepository(SaborRelleno)
    private saborRepository: Repository<SaborRelleno>,
  ) {}

  async findAll() {
    return await this.saborRepository.find();
  }

  async create(dto: CreateSaborDto) {
    try {
        const sabor = this.saborRepository.create(dto);
        return await this.saborRepository.save(sabor);
    } catch (error) {
        console.log("ERROR CREANDO SABOR:", error);
        throw error;
    }
  }

  async update(id: number, dto: UpdateSaborDto) {
    const sabor = await this.saborRepository.findOne({
      where: { id_sabor_relleno: id },
    });

    if (!sabor) {
      throw new NotFoundException('Sabor no encontrado');
    }

    await this.saborRepository.update(
      { id_sabor_relleno: id },
      dto,
    );

    return this.saborRepository.findOne({
      where: { id_sabor_relleno: id },
    });
  }

  async remove(id: number) {
    const sabor = await this.saborRepository.findOne({
      where: { id_sabor_relleno: id },
    });

    if (!sabor) {
      throw new NotFoundException('Sabor no encontrado');
    }

    await this.saborRepository.delete({
      id_sabor_relleno: id,
    });

    return {
      message: 'Sabor eliminado correctamente',
    };
  }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';

@Injectable()
export class ClientesService {

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}
  async crear(cliente: Partial<Cliente>) {
    return this.clienteRepository.save(cliente);
  }
  async findAll() {
    return this.clienteRepository.find({
      relations: {
        usuario: true,
      },
      where: {
        usuario: {
          rol: 'cliente',
        },
      },
    });
  }
  
}
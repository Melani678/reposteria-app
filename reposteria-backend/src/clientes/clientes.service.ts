import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from '../entities/cliente.entity';
import { LogAcceso } from '../entities/log-acceso.entity';

@Injectable()
export class ClientesService {

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(LogAcceso)
    private readonly logAccesoRepository: Repository<LogAcceso>,
  ) {}

  async crear(cliente: Partial<Cliente>) {
    return this.clienteRepository.save(cliente);
  }

  async findAll() {
    const clientes = await this.clienteRepository.find({
      relations: { usuario: true },
      where: { usuario: { rol: 'cliente' } },
    });

    const result = await Promise.all(
      clientes.map(async (c) => {
        const logs = await this.logAccesoRepository.find({
          where: { id_usuario: c.id_usuario },
          order: { fecha_hora: 'DESC' },
          take: 2,
        });

        const ultimoIngreso = logs.find(l => l.evento === 'ingreso');
        const ultimaSalida = logs.find(l => l.evento === 'salida');

        return {
          ...c,
          ultimo_ingreso: ultimoIngreso?.fecha_hora ?? null,
          ultima_salida: ultimaSalida?.fecha_hora ?? null,
        };
      })
    );

    return result;
  }
}
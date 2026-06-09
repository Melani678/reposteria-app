import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LogAcceso } from '../entities/log-acceso.entity';

@Injectable()
export class LogAccesoService {
  constructor(
    @InjectRepository(LogAcceso)
    private readonly logRepository: Repository<LogAcceso>,
  ) {}

  async registrar(
    id_usuario: number,
    evento: 'ingreso' | 'salida',
    ip: string,
    navegador: string,
  ) {
    return this.logRepository.save({
      id_usuario,
      evento,
      ip,
      navegador,
      fecha_hora: new Date(),
    });
  }
}
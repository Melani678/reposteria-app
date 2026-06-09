import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Usuario } from '../entities/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async buscarPorCorreo(correo: string) {
    return this.usuarioRepository.findOne({
      where: { correo },
    });
  }

  async crear(usuario: Partial<Usuario>) {
    return this.usuarioRepository.save(usuario);
  }
  async buscarPorId(id_usuario: number) {
    return this.usuarioRepository.findOne({
      where: { id_usuario },
    });
  }
}
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common';
import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UsuariosService } from '../usuarios/usuarios.service';
import { ClientesService } from '../clientes/clientes.service';

import { RegisterDto } from './dto/register.dto';
import { LogAccesoService } from '../log-acceso/log-acceso.service';
import { LogoutDto } from './dto/logout.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly clientesService: ClientesService,
    private readonly jwtService: JwtService,
    private readonly logAccesoService: LogAccesoService,
  ) {}

  async register(registerDto: RegisterDto) {
    const usuarioExistente =
      await this.usuariosService.buscarPorCorreo(
        registerDto.correo,
      );

    if (usuarioExistente) {
      throw new BadRequestException(
        'El correo ya está registrado',
      );
    }

    const passwordHash = await bcrypt.hash(
      registerDto.password,
      10,
    );

    const usuario =
      await this.usuariosService.crear({
        nombre: registerDto.nombre,
        apellido: registerDto.apellido,
        correo: registerDto.correo,

        contraseña: passwordHash,

        telefono: '',
        direccion: '',

        fecha_registro: new Date(),

        rol: 'cliente',
      });

    await this.clientesService.crear({
      usuario,
      puntos_compras: 0,
    });

    return {
      message: 'Usuario registrado correctamente',
    };
  }
  async login(
    loginDto: LoginDto,
    req: any,
  ){

    const usuario =
      await this.usuariosService.buscarPorCorreo(
        loginDto.correo,
      );

    if (!usuario) {
      throw new UnauthorizedException(
        'Credenciales incorrectas',
      );
    }

    const passwordValida =
      await bcrypt.compare(
        loginDto.password,
        usuario.contraseña,
      );

    if (!passwordValida) {
      throw new UnauthorizedException(
        'Credenciales incorrectas',
      );
    }

    await this.logAccesoService.registrar(
      usuario.id_usuario,
      'ingreso',
      req.ip || '',
      req.headers['user-agent'] || '',
    );

    const payload = {
      sub: usuario.id_usuario,
      rol: usuario.rol,
    };

    const token =
      await this.jwtService.signAsync(payload);

    return {
      token,

      usuario: {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        rol: usuario.rol,
      },
    };
  }
  async logout(
    logoutDto: LogoutDto,
    req: any,
  ) {

    await this.logAccesoService.registrar(
      logoutDto.id_usuario,
      'salida',
      req.ip || '',
      req.headers['user-agent'] || '',
    );

    return {
      message: 'Sesión cerrada correctamente',
    };
  }
}
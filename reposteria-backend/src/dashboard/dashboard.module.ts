import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

import { Producto } from '../productos/entities/producto.entity';
import { Cliente } from '../entities/cliente.entity';
import { Usuario } from '../entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Producto,
      Cliente,
      Usuario,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
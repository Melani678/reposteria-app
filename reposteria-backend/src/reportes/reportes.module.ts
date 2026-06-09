import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';

import { Producto } from '../productos/entities/producto.entity';
import { Cliente } from '../entities/cliente.entity';
import { Compra } from '../compras/entities/compra.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Producto, Cliente, Compra]),
  ],
  controllers: [ReportesController],
  providers: [ReportesService],
})
export class ReportesModule {}
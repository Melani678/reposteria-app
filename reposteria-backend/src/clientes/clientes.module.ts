import { Module } from '@nestjs/common';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from '../entities/cliente.entity';
import { LogAcceso } from '../entities/log-acceso.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cliente, LogAcceso]),
  ],
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService],
})
export class ClientesModule {}
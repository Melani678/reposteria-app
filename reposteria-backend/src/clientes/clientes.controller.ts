import { Controller, Get } from '@nestjs/common';
import { ClientesService } from './clientes.service';

@Controller('clientes')
export class ClientesController {

  constructor(private readonly service: ClientesService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
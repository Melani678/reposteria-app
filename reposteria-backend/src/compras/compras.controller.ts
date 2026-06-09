import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ComprasService } from './compras.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@Controller('compras')
export class ComprasController {
  constructor(private service: ComprasService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() data: any) {
    return this.service.crearCompra(req.user, data);
  }
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('count')
  count() {
    return this.service.count();
  }

  @Get('ventas')
  ventas() {
    return this.service.totalVentas();
  }
}
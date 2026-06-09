import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ClientesModule } from './clientes/clientes.module';
import { AuthModule } from './auth/auth.module';
import { LogAccesoModule } from './log-acceso/log-acceso.module';
import { Usuario } from './entities/usuario.entity';
import { Cliente } from './entities/cliente.entity';
import { LogAcceso } from './entities/log-acceso.entity';
import { ProductosModule } from './productos/productos.module';
import { Producto } from './productos/entities/producto.entity';
import { Cupcake } from './productos/entities/cupcake.entity';
import { Torta } from './productos/entities/torta.entity';
import { Galleta } from './productos/entities/galleta.entity';
import { Queque } from './productos/entities/queque.entity';
import { Postre } from './productos/entities/postre.entity';

import { ComprasModule } from './compras/compras.module';
import { SaboresModule } from './sabores/sabores.module';
import { SaborRelleno } from './sabores/entities/sabor.entity';
import { CarouselModule } from './carousel/carousel.module';
import { Carousel } from './carousel/entities/carousel.entity';
import { DashboardModule } from './dashboard/dashboard.module';
import { ReportesModule } from './reportes/reportes.module';
import { DetalleCompra } from './compras/entities/detalle-compra.entity';
import { Compra } from './compras/entities/compra.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',

        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')),

        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),

        entities: [
          Usuario,
          Cliente,
          LogAcceso,
          Producto,
          Cupcake,
          Torta,
          Galleta,
          Queque,
          Postre,
          SaborRelleno,
          Carousel,
          Compra,
          DetalleCompra,
        ],

        synchronize: false,
      }),
    }),

    UsuariosModule,

    ClientesModule,

    AuthModule,

    LogAccesoModule,

    ProductosModule,
    ComprasModule,

    SaboresModule,

    CarouselModule,

    DashboardModule,

    ReportesModule,
  ],
})
export class AppModule {}
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SaboresService } from './sabores.service';
import { SaboresController } from './sabores.controller';
import { SaborRelleno } from './entities/sabor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaborRelleno]) 
  ],
  controllers: [SaboresController],
  providers: [SaboresService],
})
export class SaboresModule {}
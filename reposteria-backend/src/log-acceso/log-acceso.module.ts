import { Module } from '@nestjs/common';
import { LogAccesoController } from './log-acceso.controller';
import { LogAccesoService } from './log-acceso.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogAcceso } from '../entities/log-acceso.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([LogAcceso]),
  ],
  controllers: [LogAccesoController],
  providers: [LogAccesoService],
  exports: [LogAccesoService],
})
export class LogAccesoModule {}

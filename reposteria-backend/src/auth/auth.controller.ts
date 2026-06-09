import { LoginDto } from './dto/login.dto';
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterDto } from './dto/register.dto';
import { Req } from '@nestjs/common';
import type { Request } from 'express';
import { LogoutDto } from './dto/logout.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(
    @Body() registerDto: RegisterDto,
  ) {
    return this.authService.register(
      registerDto,
    );
  }
  @Post('login')
  login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
  ) {
    return this.authService.login(
      loginDto,
      req,
    );
  }
  @Post('logout')
  logout(
    @Body() logoutDto: LogoutDto,
    @Req() req: Request,
  ) {
    return this.authService.logout(
      logoutDto,
      req,
    );
  }
  @Get('perfil')
  @UseGuards(JwtAuthGuard)
  perfil(@Req() req) {
    return req.user;
  }
  @Get('solo-admin')
  @UseGuards(
    JwtAuthGuard,
    RolesGuard,
  )
  @Roles('admin')
  soloAdmin() {
    return {
      mensaje:
        'Acceso permitido al administrador',
    };
  }
}
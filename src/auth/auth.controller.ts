import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @Post('login')
  login(@Body() body: LoginDto) {
    const payload = {
      sub: 1, 
      email: body.email,
      roles: ['USER'],
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login correcto',
      access_token: token,
      user: {
        id: payload.sub,
        email: payload.email,
        roles: payload.roles,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() req: { user: { id: number; email: string; roles: string[] } }) {
    return {
      message: 'Ruta protegida con JWT',
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('admin')
  adminOnly() {
    return {
      message: 'Ruta solo para administradores',
    };
  }
}
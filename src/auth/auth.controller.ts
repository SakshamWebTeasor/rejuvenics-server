import { Controller, ValidationPipe, UseGuards, Request, Post, HttpCode, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './auth-login.dto';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';
@ApiTags('Auth Module')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiBody({ type: AuthLoginDto })
  @Post("/login")
  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  async loginUser(@Body() loginDto: AuthLoginDto, @Request() req: any): Promise<AuthDto> {
    return await this.authService.login(req.user);
  }
}

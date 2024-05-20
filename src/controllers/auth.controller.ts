import { Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/providers/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/test')
  testAuth(): string {
    return this.authService.getHello();
  }
}

import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() userDto: any) {
    const hashedPassword = await this.authService.hashPassword(userDto.password);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return { message: 'User registered successfully', user };
  }

  @Post('login')
  async login(@Body() loginDto: any) {
    const user = await this.userService.findByUsername(loginDto.username);
    if (!user || !(await this.authService.validatePassword(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.authService.generateToken({
      username: user.username,
      sub: user.id,
      roles: user.roles,
    });
    return { accessToken: token };
  }
}

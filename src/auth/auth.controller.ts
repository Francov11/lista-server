import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
//import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginAuthDto } from './dto/login-auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() userObject: CreateAuthDto) {
    return this.authService.registerUser(userObject)
  }

  @Post('login')
  loginUser(@Body() userObject: LoginAuthDto) {
    return this.authService.loginUser(userObject)
  }

}

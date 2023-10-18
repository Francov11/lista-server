import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/guards/jwt.strategy';



@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  
  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto){
    return this.usersService.updateUser(id,user);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number){
      return this.usersService.deleteUser(id);
  }
}

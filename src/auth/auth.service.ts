import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth-user.dto';
import {JwtService} from '@nestjs/jwt'
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtAuthService:JwtService
  ) {}

  async registerUser(userObject:CreateAuthDto) {
    try{
      
      const userFound = await this.userRepository.findOne({
          where: {
            email: userObject.email
          }
      });
      
      

      if(userFound){
          return new HttpException('User already exist', HttpStatus.CONFLICT);
      }
      const {password} = userObject;
      const plainToHash = await hash(password, 10)

      userObject = {...userObject, password:plainToHash}
      const newUser = this.userRepository.create(userObject);
      
      return this.userRepository.save(newUser);

    } catch (error) {
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error - CreateUser : ' + error,
          },
          HttpStatus.NOT_FOUND,
      );
    }
  }

  async loginUser(userObject:LoginAuthDto) {
    try{
      const {email, password} = userObject;
      const userFound = await this.userRepository.findOne({
          where: {
            email: userObject.email
          }
      });
      

      if(!userFound) throw new HttpException('USER NOT FOUND', 404);
  

      const checkPassword = await compare(password, userFound.password);

      if(!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);
      
      const payload = {id: userFound.id, name: userFound.name}

      const token = await this.jwtAuthService.sign(payload)

      const data = {
        user: userFound,
        token,
      }
      
      return data;

    } catch (error) {
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error - LoginUser : ' + error,
          },
          HttpStatus.NOT_FOUND,
      );
    }
  }
}

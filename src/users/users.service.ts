import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
) {}


  getAllUsers():Promise<User[]>{
    try {
      return this.userRepository.find();
    } catch {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error - LoginUser : ' + Error,
        },
        HttpStatus.NOT_FOUND,
    );
    }
  }

  async getUserById(id: number) {
    try {
      const userFound = await this.userRepository.findOne({
        where: {
            id
        }
    });
    if(!userFound){
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userFound;

    } catch {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error - LoginUser : ' + Error,
        },
        HttpStatus.NOT_FOUND,
    );
    }
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userFound = this.userRepository.findOne({
        where: {
            id
        }
      })
      if(!userFound){
        return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const updateUser = Object.assign(userFound, updateUserDto)
      return this.userRepository.save(updateUser)

    } catch {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error - LoginUser : ' + Error,
        },
        HttpStatus.NOT_FOUND,
    );
    }
  }

  async deleteUser(id: number) {
    try {
      const result = await this.userRepository.delete({id});

      if(result.affected === 0){
          return new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return result;

    } catch {
      throw new HttpException({
        status: HttpStatus.CONFLICT,
        error: 'Error - LoginUser : ' + Error,
        },
        HttpStatus.NOT_FOUND,
    );
    }
  }
}

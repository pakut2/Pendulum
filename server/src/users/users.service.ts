import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "./entities/user.entity";
import CreateUserDto from "./dto/createUser.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async getById(id: number) {
    const user = await this.usersRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  // async update(id: number, userData: CreateUserDto) {
  //   if (userData.password) {
  //     userData.password = await bcrypt.hash(userData.password, 10);
  //   }
  //   const updatedUser = await this.usersRepository.update(id, userData);
  //   return updatedUser;
  // }

  async delete(id: number) {
    try {
      await this.usersRepository.delete(id);
    } catch (err) {
      throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
    }
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import JwtAuthenticationGuard from "../auth/guards/jwt.guard";
import RequestWithUser from "../auth/interfaces/requestWithUser";
import CreateUserDto from "./dto/createUser.dto";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(":id")
  async getUserById(@Param("id") id: number) {
    const user = await this.usersService.getById(id);
    user.password = undefined;
    return user;
  }

  // @UseGuards(JwtAuthenticationGuard)
  // @Put(":id")
  // async updateUser(@Param("id") id: number, @Body() userData: CreateUserDto) {
  //   return this.usersService.update(id, userData);
  // }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(":id")
  async deleteUser(@Param("id") id: number) {
    this.usersService.delete(id);
  }
}

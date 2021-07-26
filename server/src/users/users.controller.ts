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
import RegisterDto from "src/auth/dto/register.dto";
import JwtAuthenticationGuard from "../auth/guards/jwt.guard";
import RequestWithUser from "../auth/interfaces/requestWithUser";
import CreateUserDto from "./dto/createUser.dto";
import UpdateDto from "./dto/update.dto";
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

  // @UseGuards(JwtAuthenticationGuard)
  @Get(":id")
  async getUserById(@Param("id") id: string) {
    const user = await this.usersService.getById(id);
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(":id")
  async updateUser(@Param("id") id: string, @Body() userData: UpdateDto) {
    this.usersService.update(id, userData);

    const updatedUser = await this.usersService.getById(id);

    updatedUser.password = undefined;
    return updatedUser;
  }
}

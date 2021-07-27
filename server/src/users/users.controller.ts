import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { Roles } from "src/auth/decorators/roles.decorator";
import { RolesGuard } from "src/auth/guards/roles.guard";
import JwtAuthenticationGuard from "../auth/guards/jwt.guard";
import RequestWithUser from "../auth/interfaces/requestWithUser";
import UpdateDto from "./dto/update.dto";
import { Role } from "./entities/role.enum";
import { UsersService } from "./users.service";

@Controller("users")
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get("user")
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(":id")
  async getUserById(@Param("id") id: string) {
    return this.usersService.getById(id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(":id")
  async updateUser(@Param("id") id: string, @Body() userData: UpdateDto) {
    this.usersService.update(id, userData);
    return this.usersService.getById(id);
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    return this.usersService.delete(id);
  }
}

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { Roles } from "../auth/decorators/roles.decorator";
import { RolesGuard } from "../auth/guards/roles.guard";
import JwtAuthenticationGuard from "../auth/guards/jwt.guard";
import RequestWithUser from "../auth/interfaces/requestWithUser";
import UpdateDto from "./dto/update.dto";
import { Role } from "./entities/role.enum";
import { UsersService } from "./users.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { Express } from "express";

@Controller("users")
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthenticationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("user")
  authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  @Get(":id")
  async getUserById(@Param("id") id: string) {
    return this.usersService.getById(id);
  }

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async addAvatar(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.usersService.addAvatar(
      request.user.id,
      file.buffer,
      file.originalname
    );
  }

  @Put(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() userData: UpdateDto,
    @Req() request: RequestWithUser
  ) {
    if (id !== this.authenticate(request).id) {
      throw new HttpException("Invalid Credentials", HttpStatus.FORBIDDEN);
    }

    await this.usersService.update(id, userData);
    return this.usersService.getById(id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Get()
  async getAllUsers() {
    return this.usersService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Delete(":id")
  async deleteUser(@Param("id") id: string, @Req() request: RequestWithUser) {
    await this.usersService.deleteAvatar(id);
    return this.usersService.delete(id, request.user);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Put("admin/:id")
  async adminUserUpdate(@Param("id") id: string, @Body() userData: UpdateDto) {
    await this.usersService.adminUpdate(id, userData);
  }
}

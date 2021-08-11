import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import User from "./entities/user.entity";
import { FilesModule } from "../files/files.module";
import { PostsModule } from "src/posts/posts.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), FilesModule, PostsModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}

import { Module } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { PostsController } from "./posts.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "./entities/post.entity";
import { PostsGateway } from "./gateways/posts.gateway";

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostsService, PostsGateway],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}

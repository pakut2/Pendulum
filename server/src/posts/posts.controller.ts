import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import RequestWithUser from "../auth/interfaces/requestWithUser";
import JwtAuthenticationGuard from "../auth/guards/jwt.guard";
import createPostDto from "./dto/createPostDto.dto";
import { PostsService } from "./posts.service";

@Controller("posts")
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    return this.postsService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async createPost(
    @Body() postData: createPostDto,
    @Req() request: RequestWithUser
  ) {
    return this.postsService.create(postData, request.user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(":id")
  async deletePost(@Param("id") id: string) {
    return this.postsService.delete(id);
  }
}

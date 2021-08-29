import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { RequestWithUser } from "../auth/interfaces/requestWithUser";
import { JwtAuthenticationGuard } from "../auth/guards/jwt.guard";
import { createPostDto } from "./dto/createPostDto.dto";
import { PostsService } from "./posts.service";

@Controller("posts")
@UseInterceptors(ClassSerializerInterceptor)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts() {
    return this.postsService.findAll();
  }

  @Get(":id")
  async getPostById(@Param("id") id: string) {
    return this.postsService.findOne(id);
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
  async deletePost(@Param("id") id: string, @Req() request: RequestWithUser) {
    return this.postsService.delete(id, request.user);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put("like/:id")
  async likePost(@Param("id") id: string, @Req() request: RequestWithUser) {
    await this.postsService.like(id, request.user);
  }

  // @Get("search/:query")
  // async queryFind(@Param("query") query: string) {
  //   return this.postsService.queryFind(query);
  // }
}

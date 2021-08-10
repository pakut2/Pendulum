import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import User from "../users/entities/user.entity";
import { Repository } from "typeorm";
import createPostDto from "./dto/createPostDto.dto";
import Post from "./entities/post.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>
  ) {}

  async findAll() {
    return this.postsRepository.find({ relations: ["author"] });
  }

  async create(postData: createPostDto, user: User) {
    const newPost = await this.postsRepository.create({
      ...postData,
      author: user,
    });
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async delete(id: string) {
    try {
      const post = await this.postsRepository.findOne({ id });

      if (post) {
        return this.postsRepository.delete(id);
      }
    } catch (err) {
      throw new HttpException("Post does not exist", HttpStatus.NOT_FOUND);
    }
  }
}

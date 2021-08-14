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
    const posts = await this.postsRepository.find({
      relations: ["author"],
    });

    posts.sort((a, b) => (a.likes.length < b.likes.length ? 1 : -1));

    return posts;
  }

  async findOne(id: string) {
    return this.postsRepository.findOne({ id });
  }

  async create(postData: createPostDto, user: User) {
    const newPost = await this.postsRepository.create({
      ...postData,
      author: user,
    });
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async delete(id: string, user: User) {
    const post = await this.postsRepository.findOne(id, {
      relations: ["author"],
    });

    if (post.author.id === user.id || user.role === "admin") {
      if (post) {
        return this.postsRepository.delete(id);
      } else {
        throw new HttpException("Post does not exist", HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException("Invalid Credentials", HttpStatus.FORBIDDEN);
    }
  }

  async like(postId: string, user: User) {
    try {
      const post = await this.postsRepository.findOne({ id: postId });
      const { likes } = post;
      const index = likes.indexOf(user.id);

      if (post) {
        if (index > -1) {
          likes.splice(index, 1);
          await this.postsRepository.save(post);
        } else {
          likes.push(user.id);
          await this.postsRepository.save(post);
        }
      }
    } catch (err) {
      throw new HttpException("Post does not exist", HttpStatus.NOT_FOUND);
    }
  }
}

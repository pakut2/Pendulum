import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { createPostDto } from "./dto/createPostDto.dto";
import { Post } from "./entities/post.entity";

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>
  ) {}

  private readonly logger = new Logger(PostsService.name);

  async findAll() {
    this.logger.log(`Getting all posts`);

    const posts = await this.postsRepository
      .createQueryBuilder()
      .select("Post")
      .orderBy("Post.likes", "DESC")
      .leftJoinAndSelect("Post.author", "author")
      .leftJoinAndSelect("author.avatar", "avatar")
      .getMany();

    return posts;
  }

  async findOne(id: string) {
    this.logger.log(`Getting post by ID - ${id}`);
    const post = await this.postsRepository.findOne(id, {
      relations: ["author"],
    });

    if (post) {
      return post;
    }

    this.logger.error(`Post does not exist - ${id}`);
    throw new HttpException("Post does not exist", HttpStatus.NOT_FOUND);
  }

  async create(postData: createPostDto, user: User) {
    this.logger.log(`Creating new post - Line: ${postData.line}`);
    const newPost = await this.postsRepository.create({
      ...postData,
      author: user,
    });
    await this.postsRepository.save(newPost);

    const populatedPost = await this.postsRepository.findOne(newPost.id, {
      relations: ["author"],
    });

    return populatedPost;
  }

  async delete(id: string, user: User) {
    this.logger.log(`Getting post by ID - ${id}`);
    const post = await this.postsRepository.findOne(id, {
      relations: ["author"],
    });

    if (post.author.id === user.id || user.role === "admin") {
      if (post) {
        this.logger.log(`Deleting post - ${id}`);
        return this.postsRepository.delete(id);
      } else {
        this.logger.error(`Post does not exist - ${id}`);
        throw new HttpException("Post does not exist", HttpStatus.NOT_FOUND);
      }
    } else {
      throw new HttpException("Invalid Credentials", HttpStatus.FORBIDDEN);
    }
  }

  async like(postId: string, user: User) {
    try {
      this.logger.log(`Getting post by ID - ${postId}`);
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
      this.logger.error(`Post does not exist - ${postId}`);
      throw new HttpException("Post does not exist", HttpStatus.NOT_FOUND);
    }
  }
}

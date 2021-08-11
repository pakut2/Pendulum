import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import User from "./entities/user.entity";
import CreateUserDto from "./dto/createUser.dto";
import * as bcrypt from "bcrypt";
import PostgresErrorCode from "../database/postgresErrorCodes.enum";
import { FilesService } from "../files/files.service";
import UpdateDto from "./dto/update.dto";
import { PostsService } from "src/posts/posts.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly filesService: FilesService,
    private readonly postsService: PostsService
  ) {}

  private readonly logger = new Logger(UsersService.name);

  async getById(id: string) {
    const user = await this.usersRepository.findOne({ id });
    this.logger.log("Getting user by ID");

    if (user) {
      return user;
    }
    this.logger.error("User does not exist");
    throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
  }

  async addAvatar(userId: string, imageBuffer: Buffer, filename: string) {
    const user = await this.getById(userId);
    if (user.avatar) {
      await this.usersRepository.update(userId, {
        ...user,
        avatar: null,
      });
      await this.filesService.deletePublicFile(user.avatar.id);
    }
    const avatar = await this.filesService.uploadPublicFile(
      imageBuffer,
      filename
    );
    await this.usersRepository.update(userId, {
      ...user,
      avatar,
    });
    return avatar;
  }

  async deleteAvatar(userId: string) {
    const user = await this.getById(userId);
    const fileId = user.avatar?.id;
    if (fileId) {
      await this.usersRepository.update(userId, {
        ...user,
        avatar: null,
      });
      await this.filesService.deletePublicFile(fileId);
    }
  }

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto) {
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async update(id: string, userData: UpdateDto) {
    try {
      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }
      await this.usersRepository.update(id, userData);
    } catch (err) {
      if (err?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
      }
    }
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async delete(id: string) {
    try {
      const user = await this.usersRepository.findOne(id, {
        relations: ["posts"],
      });

      if (user) {
        user.posts.forEach(async (post) => {
          await this.postsService.delete(post.id);
        });

        return this.usersRepository.delete(id);
      }
    } catch (err) {
      throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
    }
  }

  async adminUpdate(id: string, userData: UpdateDto) {
    try {
      await this.usersRepository.update(id, userData);
    } catch (err) {
      if (err?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
      }
    }
  }
}

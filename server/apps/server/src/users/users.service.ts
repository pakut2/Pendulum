import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { CreateUserDto } from "./dto/createUser.dto";
import * as bcrypt from "bcrypt";
import { PostgresErrorCode } from "../../../shared/database/postgresErrorCodes.enum";
import { FilesService } from "../files/files.service";
import { UpdateDto } from "./dto/update.dto";
import { PostsService } from "../posts/posts.service";

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
    this.logger.log(`Getting user by ID - ${id}`);
    const user = await this.usersRepository.findOne({ id });

    if (user) {
      return user;
    }

    this.logger.error(`User does not exist - ${id}`);
    throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
  }

  async addAvatar(userId: string, key: string) {
    this.logger.log(`Getting user by ID - ${userId}`);
    const user = await this.getById(userId);

    if (user.avatar) {
      this.logger.log(`Updating user - ${userId}`);
      await this.usersRepository.update(userId, {
        ...user,
        avatar: null,
      });
      await this.filesService.deletePublicFile(user.avatar.id);
    }

    const avatar = await this.filesService.updateFilesRepository(key);

    this.logger.log(`Updating user - ${userId}`);

    await this.usersRepository.update(userId, {
      ...user,
      avatar,
    });

    const updatedUser = await this.getById(userId);
    return updatedUser;
  }

  async deleteAvatar(userId: string) {
    this.logger.log(`Getting user by ID - ${userId}`);
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
    this.logger.log(`Getting user by email - ${email}`);
    const user = await this.usersRepository.findOne({ email });
    if (user) {
      return user;
    }
    this.logger.error(`User does not exist - ${email}`);
    throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
  }

  async create(userData: CreateUserDto) {
    this.logger.log(`Creating new user - ${userData.email}`);
    const newUser = await this.usersRepository.create(userData);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async update(id: string, userData: UpdateDto) {
    try {
      if (userData.password) {
        userData.password = await bcrypt.hash(userData.password, 10);
      }
      this.logger.log(`Updating user - ${id}`);
      await this.usersRepository.update(id, userData);
    } catch (err) {
      if (err?.code === PostgresErrorCode.UniqueViolation) {
        this.logger.error(`User already exists - ${id}`);
        throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
      }
    }
  }

  async findAll() {
    this.logger.log(`Getting all users`);
    const users = await this.usersRepository.find();

    if (users) {
      return users;
    }

    this.logger.error(`No users found`);
    throw new HttpException("No users found", HttpStatus.NOT_FOUND);
  }

  async delete(id: string, userReq: User) {
    try {
      const user = await this.usersRepository.findOne(id, {
        relations: ["posts"],
      });

      if (user) {
        await user.posts.forEach(async (post) => {
          await this.postsService.delete(post.id, userReq);
        });

        this.logger.log(`Deleting user - ${id}`);
        return this.usersRepository.delete(id);
      }
    } catch (err) {
      this.logger.error(`User does not exist - ${id}`);
      throw new HttpException("User does not exist", HttpStatus.NOT_FOUND);
    }
  }

  async adminUpdate(id: string, userData: UpdateDto) {
    try {
      this.logger.log(`Admin Update / updating user - ${id}`);
      await this.usersRepository.update(id, userData);
    } catch (err) {
      if (err?.code === PostgresErrorCode.UniqueViolation) {
        this.logger.error(`Admin Update / User already exists - ${id}`);
        throw new HttpException("User already exists", HttpStatus.BAD_REQUEST);
      }
    }
  }

  async markEmailAsConfirmed(email: string) {
    return this.usersRepository.update(
      { email },
      {
        isEmailConfirmed: true,
      }
    );
  }
}

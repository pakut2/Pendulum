import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../../src/auth/auth.controller";
import { JwtService } from "@nestjs/jwt";
import { getRepositoryToken } from "@nestjs/typeorm";
import { PostsService } from "../../../server/src/posts/posts.service";
import configuration from "../../../shared/config/configuration";
import { User } from "../../../server/src/users/entities/user.entity";
import { UsersService } from "../../../server/src/users/users.service";
import { AuthService } from "../../src/auth/auth.service";
import mockedJwtService from "../utils/mocks/mockedJwtService";
import { authServiceStub } from "./auth.service.spec.stub";
import { ConfigModule } from "@nestjs/config";
import { FilesService } from "../../../server/src/files/files.service";
import { PublicFile } from "../../../server/src/files/entities/publicFile.entity";
import { EmailConfirmationService } from "../../../server/src/email-confirmation/email-confirmation.service";
import { Post } from "../../../server/src/posts/entities/post.entity";
import { EmailService } from "../../../server/src/email/email.service";

describe("AuthController", () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      controllers: [AuthController],
      providers: [
        AuthService,
        UsersService,
        PostsService,
        FilesService,
        EmailConfirmationService,
        EmailService,
        { provide: JwtService, useValue: mockedJwtService },
        {
          provide: getRepositoryToken(User),
          useClass: authServiceStub,
        },
        {
          provide: getRepositoryToken(Post),
          useValue: {},
        },
        {
          provide: getRepositoryToken(PublicFile),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = await module.get<AuthService>(AuthService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("on register", () => {
    it("should throw an error if invalid credentials", () => {
      return expect(
        controller.register({ email: null, name: null, password: null })
      ).rejects.toThrow();
    });
  });

  describe("on login", () => {
    it("should throw an error if invalid credentials", () => {
      return expect(controller.login(null)).rejects.toThrow();
    });
  });

  describe("on logout", () => {
    it("should throw an error if something went wrong", () => {
      return expect(controller.logout(null)).rejects.toThrow();
    });
  });
});

import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { PostsService } from "../../../server/src/posts/posts.service";
import configuration from "../../../shared/config/configuration";
import User from "../../../server/src/users/entities/user.entity";
import { UsersService } from "../../../server/src/users/users.service";
import { AuthService } from "../../src/auth/auth.service";
import mockedJwtService from "../utils/mocks/mockedJwtService";
import { authServiceStub } from "./auth.service.spec.stub";
import { ConfigModule } from "@nestjs/config";
import { FilesService } from "../../../server/src/files/files.service";
import PublicFile from "../../../server/src/files/entities/publicFile.entity";
import { EmailConfirmationService } from "../../../server/src/email-confirmation/email-confirmation.service";
import Post from "../../../server/src/posts/entities/post.entity";
import { EmailService } from "../../../server/src/email/email.service";

describe("AuthService", () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
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

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("when creating a cookie", () => {
    it("should return a cookie", () => {
      const result = service.getCookieWithJwtToken("1");

      expect(result).toEqual(expect.any(String));
      expect(result).toEqual(
        expect.stringContaining(
          "Authentication=; HttpOnly; Path=/; Max-Age=3600000"
        )
      );
    });
  });

  describe("on logout", () => {
    it("should return an empty cookie", () => {
      const result = service.getCookieForLogOut();

      expect(result).toEqual(expect.any(String));
      expect(result).toEqual(
        expect.stringContaining("Authentication=; HttpOnly; Path=/; Max-Age=0")
      );
    });
  });

  describe("on login", () => {
    it("should throw an error if invalid credentials are provided", async () => {
      try {
        await service.getAuthenticatedUser(null, null);
      } catch (err) {
        expect(err.message).toMatch("Invalid Credentials");
      }
    });
  });

  describe("on register", () => {
    let user: User;

    beforeEach(() => {
      user = new User();
    });

    it("should throw an error if user already exists", async () => {
      jest.spyOn(service, "register").mockReturnValue(Promise.resolve(user));

      try {
        await service.register(user);
      } catch (err) {
        expect(err.message).toMatch("User already exists");
      }
    });
  });

  describe("on password verification", () => {
    it("should throw an error if passwords are not matching", async () => {
      try {
        await service.verifyPassword("a", "b");
      } catch (err) {
        return expect(err.message).toMatch("Invalid Credentials");
      }
    });
  });
});

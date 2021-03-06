import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { PostsService } from "../../../server/src/posts/posts.service";
import configuration from "../../../shared/config/configuration";
import { User } from "../../../server/src/users/entities/user.entity";
import { UsersService } from "../../../server/src/users/users.service";
import { AuthService } from "../../src/auth/auth.service";
import mockedJwtService from "../utils/mocks/mockedJwtService";
import { ConfigModule } from "@nestjs/config";
import { FilesService } from "../../../server/src/files/files.service";
import { PublicFile } from "../../../server/src/files/entities/publicFile.entity";
import { EmailConfirmationService } from "../../../server/src/email-confirmation/email-confirmation.service";
import { Post } from "../../../server/src/posts/entities/post.entity";
import { EmailService } from "../../../server/src/email/email.service";
import { mockUser } from "../utils/mocks/mockUser";

describe("AuthService", () => {
  let service: AuthService;
  let usersService: UsersService;

  let create: jest.Mock;
  beforeEach(async () => {
    create = jest.fn();

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
          useValue: { create },
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
    usersService = module.get<UsersService>(UsersService);
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
    describe("when invalid credentials are provided", () => {
      it("should throw an error", async () => {
        try {
          await service.getAuthenticatedUser(null, null);
        } catch (err) {
          expect(err.message).toMatch("Invalid Credentials");
        }
      });
    });

    describe("when valid credentials are provided", () => {
      it("should return the user", async () => {
        jest
          .spyOn(service, "getAuthenticatedUser")
          .mockReturnValue(Promise.resolve(mockUser));
        jest
          .spyOn(service, "verifyPassword")
          .mockReturnValue(Promise.resolve());

        const user = await service.getAuthenticatedUser(
          mockUser.email,
          mockUser.password
        );

        expect(user).toEqual(mockUser);
      });
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

    describe("and valid data is provided", () => {
      it("should return a new user", async () => {
        jest
          .spyOn(usersService, "create")
          .mockReturnValue(Promise.resolve(mockUser));

        const newUser = await service.register(mockUser);
        expect(newUser).toEqual(mockUser);
      });
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

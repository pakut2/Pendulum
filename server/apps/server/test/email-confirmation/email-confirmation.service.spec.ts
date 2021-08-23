import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { FilesService } from "../../../server/src/files/files.service";
import { PostsService } from "../../../server/src/posts/posts.service";
import { EmailService } from "../../../server/src/email/email.service";
import { UsersService } from "../../../server/src/users/users.service";
import configuration from "../../../shared/config/configuration";
import { EmailConfirmationService } from "../../src/email-confirmation/email-confirmation.service";
import mockedJwtService from "../utils/mocks/mockedJwtService";
import User from "../../../server/src/users/entities/user.entity";
import PublicFile from "../../../server/src/files/entities/publicFile.entity";
import Post from "../../../server/src/posts/entities/post.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("EmailConfirmationService", () => {
  let service: EmailConfirmationService;

  let findOne: jest.Mock;
  let update: jest.Mock;
  beforeEach(async () => {
    findOne = jest.fn();
    update = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      providers: [
        EmailConfirmationService,
        EmailService,
        UsersService,
        FilesService,
        PostsService,
        { provide: JwtService, useValue: mockedJwtService },
        {
          provide: getRepositoryToken(User),
          useValue: { findOne, update },
        },
        {
          provide: getRepositoryToken(PublicFile),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Post),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<EmailConfirmationService>(EmailConfirmationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("when sending verification email", () => {
    describe("and invalid data is provided", () => {
      it("should throw an error", async () => {
        return expect(service.sendVerificationLink(null)).rejects.toThrow();
      });
    });
  });

  describe("when confirming email", () => {
    describe("and email has been already confirmed", () => {
      let user: User;

      beforeEach(() => {
        user = new User();
        user.isEmailConfirmed = true;
        findOne.mockReturnValue("Email already confirmed");
      });

      it("should throw an error", async () => {
        try {
          await service.confirmEmail(user.email);
        } catch (err) {
          expect(err.message).toMatch("Email already confirmed");
        }
      });
    });

    describe("and invalid data is provided", () => {
      it("should throw an error", async () => {
        return expect(service.confirmEmail(null)).rejects.toThrow();
      });
    });
  });

  describe("when verifying token", () => {
    describe("and invalid data is provided", () => {
      it("should throw an error", async () => {
        return expect(service.decodeConfirmationToken(null)).rejects.toThrow();
      });
    });
  });

  describe("when resending email", () => {
    describe("and no recipient is provided", () => {
      let user: User;

      beforeEach(() => {
        user = new User();
        user.isEmailConfirmed = true;
        findOne.mockReturnValue("No recipients defined");
      });

      it("should throw an error", async () => {
        try {
          await service.resendConfirmationLink(user.id);
        } catch (err) {
          expect(err.message).toMatch("No recipients defined");
        }
      });
    });

    describe("and invalid data is provided", () => {
      it("should throw an error", async () => {
        return expect(service.resendConfirmationLink(null)).rejects.toThrow();
      });
    });
  });
});

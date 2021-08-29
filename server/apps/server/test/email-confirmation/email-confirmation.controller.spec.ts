import { Test, TestingModule } from "@nestjs/testing";
import { EmailConfirmationController } from "../../src/email-confirmation/email-confirmation.controller";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { FilesService } from "../../../server/src/files/files.service";
import { PostsService } from "../../../server/src/posts/posts.service";
import { EmailService } from "../../../server/src/email/email.service";
import { UsersService } from "../../../server/src/users/users.service";
import configuration from "../../../shared/config/configuration";
import { EmailConfirmationService } from "../../src/email-confirmation/email-confirmation.service";
import mockedJwtService from "../utils/mocks/mockedJwtService";
import { User } from "../../../server/src/users/entities/user.entity";
import { PublicFile } from "../../../server/src/files/entities/publicFile.entity";
import { Post } from "../../../server/src/posts/entities/post.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("EmailConfirmationController", () => {
  let controller: EmailConfirmationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      controllers: [EmailConfirmationController],
      providers: [
        EmailConfirmationService,
        EmailService,
        UsersService,
        FilesService,
        PostsService,
        { provide: JwtService, useValue: mockedJwtService },
        {
          provide: getRepositoryToken(User),
          useValue: {},
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

    controller = module.get<EmailConfirmationController>(
      EmailConfirmationController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("when sending email", () => {
    it("should throw an error if invalid data is provided", async () => {
      return expect(controller.confirm(null)).rejects.toThrow();
    });
  });

  describe("when resending email", () => {
    it("should throw an error if invalid data is provided", async () => {
      return expect(controller.resendConfirmationLink(null)).rejects.toThrow();
    });
  });
});

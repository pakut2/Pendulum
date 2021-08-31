import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import configuration from "../../../shared/config/configuration";
import { PublicFile } from "../../../server/src/files/entities/publicFile.entity";
import { FilesService } from "../../../server/src/files/files.service";
import { PostsService } from "../../../server/src/posts/posts.service";
import { User } from "../../../server/src/users/entities/user.entity";
import { UsersService } from "../../../server/src/users/users.service";
import { UsersController } from "../../src/users/users.controller";
import { Post } from "../../../server/src/posts/entities/post.entity";
import { ConfigurationServicePlaceholders } from "aws-sdk/lib/config_service_placeholders";
import { mockUser } from "../utils/mocks/mockUser";

describe("UsersController", () => {
  let controller: UsersController;
  let service: UsersService;

  let addAvatar: jest.Mock;
  beforeEach(async () => {
    let addAvatar = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      controllers: [UsersController],
      providers: [
        UsersService,
        FilesService,
        PostsService,
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

    controller = module.get<UsersController>(UsersController);
    service = await module.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("on getting the authenticated user", () => {
    describe("and the token is not valid", () => {
      it("should throw an error", async () => {
        jest.spyOn(controller, "authenticate").mockReturnValue(null);

        const user = await controller.authenticate(null);

        expect(user).toEqual(null);
      });
    });
  });

  describe("when getting user by ID", () => {
    describe("and the user is matched", () => {
      let user: User;

      beforeEach(() => {
        user = new User();
      });

      it("should return the user", async () => {
        jest.spyOn(service, "getById").mockReturnValue(Promise.resolve(user));

        const fetchedUser = await controller.getUserById("1");
        expect(fetchedUser).toEqual(user);
      });
    });
  });

  describe("when getting all users", () => {
    describe("and the users are found", () => {
      let users: Array<User>;

      beforeEach(() => {
        users = new Array(new User());
      });

      it("should return the users", async () => {
        jest.spyOn(service, "findAll").mockReturnValue(Promise.resolve(users));

        const fetchedUsers = await controller.getAllUsers();
        expect(fetchedUsers).toEqual(users);
      });
    });
  });

  describe("when updating the user", () => {
    describe("and the user is not found", () => {
      let user: User;

      beforeEach(() => {
        user = new User();
      });

      it("should throw an error", async () => {
        return expect(
          controller.updateUser(null, user, null)
        ).rejects.toThrow();
      });
    });

    describe("and logged in user is not the target user", () => {
      it("should throw an error", async () => {
        jest.spyOn(controller, "authenticate").mockReturnValue(mockUser);
        return expect(
          controller.updateUser("2", mockUser, null)
        ).rejects.toThrow();
      });
    });
  });

  describe("when updating the user as admin", () => {
    describe("and valid data is provided", () => {
      let user: User;

      beforeEach(() => {
        user = new User();
      });

      it("should update the user", async () => {
        jest.spyOn(service, "adminUpdate").mockReturnValue(Promise.resolve());
        return expect(controller.adminUserUpdate("1", user)).toEqual(
          Promise.resolve()
        );
      });
    });
  });

  describe("when deleting the user as admin", () => {
    describe("and the user is not found", () => {
      it("should throw an error", async () => {
        return expect(controller.deleteUser(null, null)).rejects.toThrow();
      });
    });
  });

  describe("when adding a new avatar", () => {
    describe("and invalid data is provided", () => {
      it("should throw an error", async () => {
        return expect(controller.addAvatar(null, null)).rejects.toThrow();
      });
    });
  });
});

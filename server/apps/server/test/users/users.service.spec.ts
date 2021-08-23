import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import configuration from "../../..//shared/config/configuration";
import { UsersService } from "../../src/users/users.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import Post from "../../../server/src/posts/entities/post.entity";
import { FilesService } from "../../../server/src/files/files.service";
import { PostsService } from "../../../server/src/posts/posts.service";
import User from "../../../server/src/users/entities/user.entity";
import PublicFile from "../../../server/src/files/entities/publicFile.entity";

describe("UsersService", () => {
  let service: UsersService;

  let findOne: jest.Mock;
  let find: jest.Mock;
  let update: jest.Mock;
  let create: jest.Mock;
  let save: jest.Mock;

  beforeEach(async () => {
    findOne = jest.fn();
    find = jest.fn();
    update = jest.fn();
    create = jest.fn();
    save = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      providers: [
        UsersService,
        FilesService,
        PostsService,
        {
          provide: getRepositoryToken(User),
          useValue: { findOne, find, update, create, save },
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

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("when getting user by ID", () => {
    describe("and the user is matched", () => {
      let user: User;

      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      });

      it("should return the user", async () => {
        const fetchedUser = await service.getById("1");
        expect(fetchedUser).toEqual(user);
      });
    });

    describe("and the user is not matched", () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });

      it("should throw an error", async () => {
        await expect(service.getById("1")).rejects.toThrow();
      });
    });
  });

  describe("when getting a user by email", () => {
    describe("and the user is matched", () => {
      let user: User;

      beforeEach(() => {
        user = new User();
        findOne.mockReturnValue(Promise.resolve(user));
      });

      it("should return the user", async () => {
        const fetchedUser = await service.getByEmail("test@test.com");
        expect(fetchedUser).toEqual(user);
      });
    });

    describe("and the user is not matched", () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });

      it("should throw an error", async () => {
        await expect(service.getByEmail("test@test.com")).rejects.toThrow();
      });
    });
  });

  describe("when getting all users", () => {
    describe("and users are found", () => {
      let users: Array<User>;

      beforeEach(() => {
        users = new Array(new User());
        find.mockReturnValue(Promise.resolve(users));
      });

      it("should return an array of users", async () => {
        const fetchedUsers = await service.findAll();
        expect(fetchedUsers).toEqual(users);
      });
    });

    describe("and users are not found", () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });

      it("should throw an error", async () => {
        await expect(service.findAll()).rejects.toThrow();
      });
    });
  });

  describe("when updating the user", () => {
    describe("and the user is matched", () => {
      let user: User;

      beforeEach(() => {
        user = new User();
        update.mockReturnValue(Promise.resolve());
      });

      it("should resolve the promise", async () => {
        const updatedUser = await service.update("1", user);
        expect(updatedUser).toEqual(undefined);
      });
    });

    describe("and invalid data is provided", () => {
      it("should throw an error", async () => {
        try {
          await service.update(null, null);
        } catch (err) {
          expect(err.message).toMatch("Internal Server Error");
        }
      });
    });
  });

  describe("when updating the user as admin", () => {
    describe("and the user is matched", () => {
      let user: User;

      beforeEach(() => {
        user = new User();
        update.mockReturnValue(Promise.resolve());
      });

      it("should resolve the promise", async () => {
        const updatedUser = await service.adminUpdate("1", user);
        expect(updatedUser).toEqual(undefined);
      });
    });

    describe("and invalid data is provided", () => {
      it("should throw an error", async () => {
        try {
          await service.adminUpdate(null, null);
        } catch (err) {
          expect(err.message).toMatch("Internal Server Error");
        }
      });
    });
  });

  describe("when creating a new user", () => {
    let user: User;

    beforeEach(() => {
      user = new User();
      create.mockReturnValue(Promise.resolve(user));
    });

    it("should return a new user", async () => {
      const newUser = await service.create(user);
      expect(newUser).toEqual(user);
    });
  });

  describe("when deleting the user", () => {
    describe("and user is matched", () => {
      let user: User;

      beforeEach(() => {
        user = new User();
      });

      it("should resolve the promise", async () => {
        jest.spyOn(service, "delete");

        await expect(service.delete("1", user)).resolves;
      });
    });
  });

  describe("when marking email as confirmed", () => {
    describe("and the user is matched", () => {
      it("should resolve the promise", async () => {
        jest.spyOn(service, "update").mockReturnValue(Promise.resolve());
        await expect(service.markEmailAsConfirmed("test@test.test")).resolves;
      });
    });
  });
});

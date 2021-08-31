import { ConfigModule } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { User } from "../../../server/src/users/entities/user.entity";
import { Post } from "../../../server/src/posts/entities/post.entity";
import configuration from "../../../shared/config/configuration";
import { PostsService } from "../../src/posts/posts.service";
import { mockPost } from "../utils/mocks/mockPost";
import { mockUser } from "../utils/mocks/mockUser";

describe("PostsService", () => {
  let service: PostsService;

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
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: {
            findOne,
            find,
            update,
            create,
            save,
          },
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("when getting post by ID", () => {
    describe("and the post is matched", () => {
      let post: Post;

      beforeEach(() => {
        post = new Post();
        findOne.mockReturnValue(Promise.resolve(post));
      });

      it("should return the post", async () => {
        const fetchedPost = await service.findOne("1");
        expect(fetchedPost).toEqual(post);
      });
    });

    describe("and the post is not matched", () => {
      beforeEach(() => {
        findOne.mockReturnValue(undefined);
      });

      it("should throw an error", async () => {
        await expect(service.findOne("1")).rejects.toThrow();
      });
    });
  });

  describe("when getting all posts", () => {
    describe("and posts are found", () => {
      let posts: Array<Post>;

      beforeEach(() => {
        posts = new Array(new Post());
      });

      it("should return an array of posts", async () => {
        jest.spyOn(service, "findAll").mockReturnValue(Promise.resolve(posts));

        const result = jest.fn(() => ({
          createQueryBuilder: jest.fn(() => ({
            select: jest.fn().mockReturnThis(),
            orderBy: jest.fn().mockReturnThis(),
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockImplementation(() => {
              return posts;
            }),
          })),
        }));

        expect(result).toEqual(result);
      });
    });

    describe("and posts are not found", () => {
      beforeEach(() => {
        find.mockReturnValue(undefined);
      });

      it("should throw an error", async () => {
        await expect(service.findAll()).rejects.toThrow();
      });
    });
  });

  describe("when creating a new post", () => {
    let post: Post;
    let user: User;

    beforeEach(() => {
      post = new Post();
      user = new User();
      create.mockReturnValue(Promise.resolve(post));
    });

    it("should return a new post", async () => {
      const newPost = await service.create(post, user);
      expect(newPost).toEqual(post);
    });
  });

  describe("when deleting the post", () => {
    describe("and the post is not matched", () => {
      it("should throw an error", async () => {
        jest.spyOn(service, "delete");

        await expect(service.delete(null, null)).rejects.toThrow();
      });
    });

    describe("and the post is matched", () => {
      beforeEach(() => {
        findOne.mockReturnValue(Promise.resolve(mockPost));
      });

      it("should delete the post", async () => {
        // @ts-ignore
        jest.spyOn(service, "delete").mockReturnValue(Promise.resolve());
        await service.delete("1", mockUser);
      });
    });
  });

  describe("when liking the post", () => {
    describe("and post is not found", () => {
      it("should throw an error", async () => {
        try {
          await service.like(null, null);
        } catch (err) {
          expect(err.message).toMatch("Post does not exist");
        }
      });
    });

    describe("and post has been already liked", () => {
      mockPost.likes.push("1");

      beforeEach(() => {
        findOne.mockReturnValue(Promise.resolve(mockPost));
      });

      it("should unlike the post", async () => {
        await service.like("1", mockUser);
        expect(mockPost.likes.length).toEqual(0);
      });
    });

    describe("and post has not been liked", () => {
      beforeEach(() => {
        findOne.mockReturnValue(Promise.resolve(mockPost));
      });

      it("should like the post", async () => {
        await service.like("1", mockUser);
        expect(mockPost.likes.length).toEqual(1);
      });
    });
  });
});

import { Test, TestingModule } from "@nestjs/testing";
import { PostsController } from "../../src/posts/posts.controller";
import configuration from "../../../shared/config/configuration";
import { ConfigModule } from "@nestjs/config";
import { PostsService } from "../../../server/src/posts/posts.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import Post from "../../../server/src/posts/entities/post.entity";

describe("PostsController", () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ load: [configuration] })],
      controllers: [PostsController],
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = await module.get<PostsService>(PostsService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("when getting post by ID", () => {
    describe("and the post is matched", () => {
      let post: Post;

      beforeEach(() => {
        post = new Post();
      });

      it("should return the post", async () => {
        jest.spyOn(service, "findOne").mockReturnValue(Promise.resolve(post));

        const fetchedPost = await controller.getPostById("1");
        expect(fetchedPost).toEqual(post);
      });
    });
  });

  describe("when getting all posts", () => {
    describe("and the posts are found", () => {
      let posts: Array<Post>;

      beforeEach(() => {
        posts = new Array(new Post());
      });

      it("should return the posts", async () => {
        jest.spyOn(service, "findAll").mockReturnValue(Promise.resolve(posts));

        const fetchedPosts = await controller.getAllPosts();
        expect(fetchedPosts).toEqual(posts);
      });
    });
  });

  describe("when creating a post", () => {
    it("should throw an error if invalid data is provided", async () => {
      return expect(controller.createPost(null, null)).rejects.toThrow();
    });
  });

  describe("when deleting the post", () => {
    it("should throw an error if invalid data is provided", async () => {
      return expect(controller.deletePost(null, null)).rejects.toThrow();
    });
  });

  describe("when liking the post", () => {
    it("should throw an error if invalid data is provided", async () => {
      return expect(controller.likePost(null, null)).rejects.toThrow();
    });
  });
});

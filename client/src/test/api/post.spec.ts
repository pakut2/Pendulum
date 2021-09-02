import axios from "axios";
import { mockPost } from "../../../../server/apps/server/test/utils/mocks/mockPost";
import {
  createPost,
  deletePost,
  getPostDetails,
  likePost,
  listPosts,
} from "../../api/post";

describe("when getting all posts", () => {
  it("should return the posts", async () => {
    jest
      .spyOn(axios, "get")
      .mockReturnValue(Promise.resolve({ data: [mockPost] }));

    const posts = await listPosts();

    expect(posts).toEqual([mockPost]);
  });
});

describe("when getting the post", () => {
  it("should return the post", async () => {
    jest
      .spyOn(axios, "get")
      .mockReturnValue(Promise.resolve({ data: mockPost }));

    const posts = await getPostDetails("1");

    expect(posts).toEqual(mockPost);
  });
});

describe("when creating a new post", () => {
  it("should return created post", async () => {
    jest
      .spyOn(axios, "post")
      .mockReturnValue(Promise.resolve({ data: mockPost }));

    const posts = await createPost(mockPost);

    expect(posts).toEqual(mockPost);
  });
});

describe("when deleting the post", () => {
  it("should delete the post", async () => {
    jest.spyOn(axios, "delete").mockReturnValue(Promise.resolve());

    deletePost("1");
  });
});

describe("when liking the post", () => {
  it("should like the post", async () => {
    jest.spyOn(axios, "put").mockReturnValue(Promise.resolve());

    likePost("1");
  });
});

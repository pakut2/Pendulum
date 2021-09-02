import { mockPost } from "../../../../../server/apps/server/test/utils/mocks/mockPost";
import { postEnum } from "../../../store/enum/post.enum";
import {
  postCreateReducer,
  postDeleteReducer,
  postGetDetailsReducer,
  postLikeReducer,
  postListReducer,
  postsFromSocketReducer,
} from "../../../store/reducers/postReducers";

describe("postListReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(postListReducer(undefined, {})).toEqual({ posts: [] });
  });

  it("should handle request", () => {
    expect(
      // @ts-ignore
      postListReducer({}, { type: postEnum.POST_LIST_REQUEST })
    ).toEqual({ loading: true, posts: [] });
  });

  it("should handle success", () => {
    expect(
      postListReducer(
        { posts: [] },
        // @ts-ignore
        { payload: [mockPost], type: postEnum.POST_LIST_SUCCESS }
      )
    ).toEqual({ loading: false, posts: [mockPost] });
  });

  it("should handle fail", () => {
    expect(
      postListReducer(
        { posts: [] },
        // @ts-ignore
        { payload: "error", type: postEnum.POST_LIST_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });
});

describe("postGetDetailsReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(postGetDetailsReducer(undefined, {})).toEqual({});
  });

  it("should handle request", () => {
    expect(
      // @ts-ignore
      postGetDetailsReducer({}, { type: postEnum.POST_GET_DETAILS_REQUEST })
    ).toEqual({ loading: true });
  });

  it("should handle success", () => {
    expect(
      postGetDetailsReducer(
        {},
        // @ts-ignore
        { payload: mockPost, type: postEnum.POST_GET_DETAILS_SUCCESS }
      )
    ).toEqual({ loading: false, post: mockPost });
  });

  it("should handle fail", () => {
    expect(
      postGetDetailsReducer(
        {},
        // @ts-ignore
        { payload: "error", type: postEnum.POST_GET_DETAILS_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });

  it("should handle reset", () => {
    expect(
      postGetDetailsReducer(
        {},
        // @ts-ignore
        { type: postEnum.POST_GET_DETAILS_RESET }
      )
    ).toEqual({});
  });
});

describe("postCreateReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(postCreateReducer(undefined, {})).toEqual({});
  });

  it("should handle request", () => {
    expect(
      // @ts-ignore
      postCreateReducer({}, { type: postEnum.POST_CREATE_REQUEST })
    ).toEqual({ loading: true });
  });

  it("should handle success", () => {
    expect(
      postCreateReducer(
        {},
        // @ts-ignore
        { payload: mockPost, type: postEnum.POST_CREATE_SUCCESS }
      )
    ).toEqual({ loading: false, post: mockPost, success: true });
  });

  it("should handle fail", () => {
    expect(
      postCreateReducer(
        {},
        // @ts-ignore
        { payload: "error", type: postEnum.POST_CREATE_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });

  it("should handle reset", () => {
    expect(
      postCreateReducer(
        {},
        // @ts-ignore
        { type: postEnum.POST_CREATE_RESET }
      )
    ).toEqual({});
  });
});

describe("postDeleteReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(postDeleteReducer(undefined, {})).toEqual({});
  });

  it("should handle request", () => {
    expect(
      // @ts-ignore
      postDeleteReducer({}, { type: postEnum.POST_DELETE_REQUEST })
    ).toEqual({ loading: true });
  });

  it("should handle success", () => {
    expect(
      postDeleteReducer(
        {},
        // @ts-ignore
        { type: postEnum.POST_DELETE_SUCCESS }
      )
    ).toEqual({ loading: false, success: true });
  });

  it("should handle fail", () => {
    expect(
      postDeleteReducer(
        {},
        // @ts-ignore
        { payload: "error", type: postEnum.POST_DELETE_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });
});

describe("postLikeReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(postLikeReducer(undefined, {})).toEqual({});
  });

  it("should handle request", () => {
    expect(
      // @ts-ignore
      postLikeReducer({}, { type: postEnum.POST_LIKE_REQUEST })
    ).toEqual({ loading: true });
  });

  it("should handle success", () => {
    expect(
      postLikeReducer(
        {},
        // @ts-ignore
        { type: postEnum.POST_LIKE_SUCCESS }
      )
    ).toEqual({ loading: false, success: true });
  });

  it("should handle fail", () => {
    expect(
      postLikeReducer(
        {},
        // @ts-ignore
        { payload: "error", type: postEnum.POST_LIKE_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });
});

describe("postsFromSocketReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(postsFromSocketReducer(undefined, {})).toEqual({ posts: [] });
  });

  it("should handle success", () => {
    expect(
      postsFromSocketReducer(
        { posts: [] },
        // @ts-ignore
        { payload: [mockPost], type: postEnum.POST_FROM_SOCKET_NEW }
      )
    ).toEqual({ posts: [mockPost] });
  });
});

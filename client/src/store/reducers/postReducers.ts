import { PayloadAction } from "@reduxjs/toolkit";
import { postEnum } from "../enum/post.enum";

export const postListReducer = (
  state = { posts: [] },
  action: PayloadAction
) => {
  const { type, payload } = action;

  switch (type) {
    case postEnum.POST_LIST_REQUEST:
      return { loading: true, posts: [] };
    case postEnum.POST_LIST_SUCCESS:
      return {
        loading: false,
        posts: payload,
      };
    case postEnum.POST_LIST_FAIL:
      return { loading: false, posts: [], error: payload };
    default:
      return state;
  }
};

export const postGetDetailsReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case postEnum.POST_GET_DETAILS_REQUEST:
      return { loading: true };
    case postEnum.POST_GET_DETAILS_SUCCESS:
      return {
        loading: false,
        post: payload,
      };
    case postEnum.POST_GET_DETAILS_FAIL:
      return { loading: false, error: payload };
    case postEnum.POST_GET_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case postEnum.POST_CREATE_REQUEST:
      return { loading: true };
    case postEnum.POST_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        post: payload,
      };
    case postEnum.POST_CREATE_FAIL:
      return { loading: false, error: payload };
    case postEnum.POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case postEnum.POST_DELETE_REQUEST:
      return { loading: true };
    case postEnum.POST_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case postEnum.POST_DELETE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const postLikeReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case postEnum.POST_LIKE_REQUEST:
      return { loading: true };
    case postEnum.POST_LIKE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case postEnum.POST_LIKE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const postsFromSocketReducer = (
  state = { posts: [] },
  action: PayloadAction
) => {
  const { type, payload } = action;

  switch (type) {
    case postEnum.POST_FROM_SOCKET_NEW:
      return {
        posts: payload,
      };
    default:
      return state;
  }
};

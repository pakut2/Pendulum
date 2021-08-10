import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_RESET,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
} from "../constants/postConstants";

export const postListReducer = (state = { posts: [] }, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case POST_LIST_REQUEST:
      return { loading: true, posts: [] };
    case POST_LIST_SUCCESS:
      return {
        loading: false,
        posts: payload,
      };
    case POST_LIST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const postCreateReducer = (state = {}, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case POST_CREATE_REQUEST:
      return { loading: true };
    case POST_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case POST_CREATE_FAIL:
      return { loading: false, error: payload };
    case POST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const postDeleteReducer = (state = {}, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case POST_DELETE_REQUEST:
      return { loading: true };
    case POST_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case POST_DELETE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

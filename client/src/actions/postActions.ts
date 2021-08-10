import axios from "axios";
import {
  POST_CREATE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_DELETE_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_LIST_FAIL,
  POST_LIST_REQUEST,
  POST_LIST_SUCCESS,
} from "../constants/postConstants";

export const listPosts = () => async (dispatch: any) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });

    const { data } = await axios.get("/api/posts");

    dispatch({ type: POST_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createPost = (data: Object) => async (dispatch: any) => {
  try {
    dispatch({ type: POST_CREATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios.post("/api/posts", data, config);

    dispatch({ type: POST_CREATE_SUCCESS });
  } catch (err) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deletePost = (id: string) => async (dispatch: any) => {
  try {
    dispatch({ type: POST_DELETE_REQUEST });

    await axios.delete(`/api/posts/${id}`);

    dispatch({ type: POST_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

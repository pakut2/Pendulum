import axios from "axios";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { postEnum } from "../store/enum/post.enum";

export const listPosts =
  () => async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({ type: postEnum.POST_LIST_REQUEST });

      const { data } = await axios.get("/api/posts");

      dispatch({ type: postEnum.POST_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: postEnum.POST_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const getPostDetails =
  (id: string) => async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({ type: postEnum.POST_GET_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/posts/${id}`);

      dispatch({ type: postEnum.POST_GET_DETAILS_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: postEnum.POST_GET_DETAILS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

interface PostData {
  line: string;
  direction: string;
  closestStop: string;
  vehicleCode?: string;
  description?: string;
}

export const createPost =
  ({ line, direction, closestStop, vehicleCode, description }: PostData) =>
  async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({ type: postEnum.POST_CREATE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        "/api/posts",
        { line, direction, closestStop, vehicleCode, description },
        config
      );

      dispatch({ type: postEnum.POST_CREATE_SUCCESS });
    } catch (err) {
      dispatch({
        type: postEnum.POST_CREATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const deletePost =
  (id: string) => async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({ type: postEnum.POST_DELETE_REQUEST });

      await axios.delete(`/api/posts/${id}`);

      dispatch({ type: postEnum.POST_DELETE_SUCCESS });
    } catch (err) {
      dispatch({
        type: postEnum.POST_DELETE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const likePost =
  (id: string) => async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({ type: postEnum.POST_LIKE_REQUEST });

      await axios.put(`/api/posts/like/${id}`);

      dispatch({ type: postEnum.POST_LIKE_SUCCESS });
    } catch (err) {
      dispatch({
        type: postEnum.POST_LIKE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

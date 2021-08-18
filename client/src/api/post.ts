import axios from "axios";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { postEnum } from "../store/enum/post.enum";

export const listPosts = async () => {
  const { data } = await axios.get("/api/posts");
  return data;
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

// export const getPostDetails = async (id: string) => {
//   const { data } = await axios.get(`/api/posts/${id}`);
//   return data;
// };

interface PostData {
  line: string;
  direction: string;
  closestStop: string;
  vehicleCode?: string;
  description?: string;
}

export const createPost = async ({
  line,
  direction,
  closestStop,
  vehicleCode,
  description,
}: PostData) => {
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

// export const deletePost = async (id: string) => {
//   await axios.delete(`/api/posts/${id}`);
// };

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

import axios from "axios";
import { AUTH_LOGOUT } from "../constants/authConstants";
import {
  USER_GET_AUTH_FAIL,
  USER_GET_AUTH_REQUEST,
  USER_GET_AUTH_SUCCESS,
} from "../constants/userConstants";

export const getAuthenticatedUser = () => async (dispatch: any) => {
  try {
    dispatch({ type: USER_GET_AUTH_REQUEST });

    const { data } = await axios.get("/api/users");

    dispatch({ type: USER_GET_AUTH_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_GET_AUTH_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });

    dispatch({ type: AUTH_LOGOUT });
  }
};

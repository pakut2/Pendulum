import axios from "axios";
import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from "../constants/authConstants";
import {
  USER_GET_AUTH_FAIL,
  USER_GET_AUTH_REQUEST,
  USER_GET_AUTH_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
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
    localStorage.removeItem("userInfo");
  }
};

export const updateUser =
  (id: string, user: Object) => async (dispatch: any) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(`/api/users/${id}`, user, config);

      dispatch({
        type: USER_UPDATE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: AUTH_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

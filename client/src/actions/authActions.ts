import axios from "axios";
import {
  AUTH_LOGIN_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_LOGOUT_FAIL,
  AUTH_REGISTER_FAIL,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
} from "../constants/authConstants";
import { USER_UPDATE_RESET } from "../constants/userConstants";

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      dispatch({ type: AUTH_LOGIN_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/auth/login",
        { email, password },
        config
      );

      dispatch({
        type: AUTH_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: AUTH_LOGIN_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const logout = () => async (dispatch: any) => {
  localStorage.removeItem("userInfo");

  dispatch({
    type: AUTH_LOGOUT,
  });

  dispatch({ type: USER_UPDATE_RESET });

  try {
    await axios.post("/api/auth/logout");
  } catch (err) {
    dispatch({
      type: AUTH_LOGOUT_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const register =
  (name: string, email: string, password: string) => async (dispatch: any) => {
    try {
      dispatch({
        type: AUTH_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/auth/register",
        { name, email, password },
        config
      );

      dispatch({
        type: AUTH_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_REGISTER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

import axios from "axios";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { authEnum } from "../store/enum/auth.enum";
import { userEnum } from "../store/enum/user.enum";

export const login =
  (email: string, password: string) =>
  async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({ type: authEnum.AUTH_LOGIN_REQUEST });

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
        type: authEnum.AUTH_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: authEnum.AUTH_LOGIN_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const logout =
  () => async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    localStorage.removeItem("userInfo");

    dispatch({
      type: authEnum.AUTH_LOGOUT,
    });

    dispatch({ type: userEnum.USER_UPDATE_RESET });

    dispatch({ type: userEnum.USER_GET_AUTH_RESET });

    try {
      await axios.post("/api/auth/logout");
    } catch (err) {
      dispatch({
        type: authEnum.AUTH_LOGOUT_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const register =
  (name: string, email: string, password: string) =>
  async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({
        type: authEnum.AUTH_REGISTER_REQUEST,
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
        type: authEnum.AUTH_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: authEnum.AUTH_REGISTER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const sendConfirmationToken =
  (token: string) =>
  async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({
        type: authEnum.AUTH_CONFIRM_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post("/api/email-confirmation/confirm", { token }, config);

      dispatch({
        type: authEnum.AUTH_CONFIRM_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: authEnum.AUTH_CONFIRM_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const resendConfirmationEmail =
  (id: string) => async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({
        type: authEnum.AUTH_RESEND_REQUEST,
      });

      await axios.post(
        `/api/email-confirmation/resend-confirmation-link/${id}`
      );

      dispatch({
        type: authEnum.AUTH_RESEND_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: authEnum.AUTH_RESEND_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

import axios from "axios";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { authEnum } from "../store/enum/auth.enum";
import { userEnum } from "../store/enum/user.enum";

export const getAuthenticatedUser =
  () => async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({ type: userEnum.USER_GET_AUTH_REQUEST });

      const { data } = await axios.get("/api/users/user");

      dispatch({ type: userEnum.USER_GET_AUTH_SUCCESS, payload: data });
    } catch (err) {
      dispatch({
        type: userEnum.USER_GET_AUTH_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });

      dispatch({ type: authEnum.AUTH_LOGOUT });
      localStorage.removeItem("userInfo");
    }
  };

interface UserData {
  name: string;
  email: string;
  password?: string;
}

export const updateUser =
  (id: string, { name, email, password }: UserData) =>
  async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({ type: userEnum.USER_UPDATE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/users/${id}`,
        { name, email, password },
        config
      );

      dispatch({
        type: userEnum.USER_UPDATE_SUCCESS,
        payload: data,
      });

      dispatch({
        type: authEnum.AUTH_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: userEnum.USER_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const listUsers =
  () => async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({ type: userEnum.USER_LIST_REQUEST });

      const { data } = await axios.get("/api/users");

      dispatch({
        type: userEnum.USER_LIST_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: userEnum.USER_LIST_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const deleteUser =
  (id: string) => async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({ type: userEnum.USER_DELETE_REQUEST });

      await axios.delete(`/api/users/${id}`);

      dispatch({
        type: userEnum.USER_DELETE_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: userEnum.USER_DELETE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const getUserDetails =
  (id: string) => async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({ type: userEnum.USER_DETAILS_REQUEST });

      const { data } = await axios.get(`/api/users/${id}`);

      dispatch({
        type: userEnum.USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: userEnum.USER_DETAILS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const adminUpdateUser =
  (id: string, user: Object) =>
  async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({ type: userEnum.USER_ADMIN_UPDATE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.put(`/api/users/admin/${id}`, user, config);

      dispatch({
        type: userEnum.USER_ADMIN_UPDATE_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: userEnum.USER_ADMIN_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

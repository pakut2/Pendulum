import { PayloadAction } from "@reduxjs/toolkit";
import { authEnum } from "../enum/auth.enum";

export const userLoginReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case authEnum.AUTH_LOGIN_REQUEST:
      return { loading: true };
    case authEnum.AUTH_LOGIN_SUCCESS:
      return { loading: false, userInfo: payload };
    case authEnum.AUTH_LOGIN_FAIL:
      return { loading: false, error: payload };
    case authEnum.AUTH_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case authEnum.AUTH_REGISTER_REQUEST:
      return { loading: true };
    case authEnum.AUTH_REGISTER_SUCCESS:
      return { loading: false, userInfo: payload };
    case authEnum.AUTH_REGISTER_FAIL:
      return { loading: false, error: payload };
    case authEnum.AUTH_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

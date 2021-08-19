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

export const emailConfirmationReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case authEnum.AUTH_CONFIRM_REQUEST:
      return { loading: true };
    case authEnum.AUTH_CONFIRM_SUCCESS:
      return { loading: false, success: true };
    case authEnum.AUTH_CONFIRM_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const resendEmailReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case authEnum.AUTH_RESEND_REQUEST:
      return { loading: true };
    case authEnum.AUTH_RESEND_SUCCESS:
      return { loading: false, success: true };
    case authEnum.AUTH_RESEND_FAIL:
      return { loading: false, error: payload };
    case authEnum.AUTH_RESEND_RESET:
      return {};
    default:
      return state;
  }
};

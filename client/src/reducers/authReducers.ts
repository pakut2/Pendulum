import {
  AUTH_LOGIN_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REGISTER_FAIL,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_RESET,
  AUTH_REGISTER_SUCCESS,
} from "../constants/authConstants";

export const userLoginReducer = (state = {}, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_LOGIN_REQUEST:
      return { loading: true };
    case AUTH_LOGIN_SUCCESS:
      return { loading: false, userInfo: payload };
    case AUTH_LOGIN_FAIL:
      return { loading: false, error: payload };
    case AUTH_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_REGISTER_REQUEST:
      return { loading: true };
    case AUTH_REGISTER_SUCCESS:
      return { loading: false, userInfo: payload };
    case AUTH_REGISTER_FAIL:
      return { loading: false, error: payload };
    case AUTH_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

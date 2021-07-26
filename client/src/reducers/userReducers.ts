import {
  USER_GET_AUTH_FAIL,
  USER_GET_AUTH_REQUEST,
  USER_GET_AUTH_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const getAuthenticatedUserReducer = (state = {}, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case USER_GET_AUTH_REQUEST:
      return { loading: true };
    case USER_GET_AUTH_SUCCESS:
      return { loading: false, user: payload };
    case USER_GET_AUTH_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const updateUserReducer = (state = {}, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: payload };
    case USER_UPDATE_FAIL:
      return { loading: false, error: payload };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

import { AUTH_LOGOUT } from "../constants/authConstants";
import {
  USER_GET_AUTH_FAIL,
  USER_GET_AUTH_REQUEST,
  USER_GET_AUTH_SUCCESS,
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

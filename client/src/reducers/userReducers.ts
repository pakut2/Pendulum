import {
  USER_ADMIN_UPDATE_FAIL,
  USER_ADMIN_UPDATE_REQUEST,
  USER_ADMIN_UPDATE_RESET,
  USER_ADMIN_UPDATE_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_GET_AUTH_FAIL,
  USER_GET_AUTH_REQUEST,
  USER_GET_AUTH_RESET,
  USER_GET_AUTH_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
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
    case USER_GET_AUTH_RESET:
      return {};
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

export const userListReducer = (state = { users: [] }, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: payload };
    case USER_LIST_FAIL:
      return { loading: false, error: payload };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userGetDetailsReducer = (state = { user: {} }, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case USER_DETAILS_REQUEST:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, success: true, user: payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: payload };
    case USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const userAdminUpdateReducer = (state = {}, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case USER_ADMIN_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USER_ADMIN_UPDATE_FAIL:
      return { loading: false, error: payload };
    case USER_ADMIN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

import { PayloadAction } from "@reduxjs/toolkit";
import { userEnum } from "../enum/user.enum";

export const getAuthenticatedUserReducer = (
  state = {},
  action: PayloadAction
) => {
  const { type, payload } = action;

  switch (type) {
    case userEnum.USER_GET_AUTH_REQUEST:
      return { loading: true };
    case userEnum.USER_GET_AUTH_SUCCESS:
      return { loading: false, user: payload };
    case userEnum.USER_GET_AUTH_FAIL:
      return { loading: false, error: payload };
    case userEnum.USER_GET_AUTH_RESET:
      return {};
    default:
      return state;
  }
};

export const updateUserReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case userEnum.USER_UPDATE_REQUEST:
      return { loading: true };
    case userEnum.USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: payload };
    case userEnum.USER_UPDATE_FAIL:
      return { loading: false, error: payload };
    case userEnum.USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (
  state = { users: [] },
  action: PayloadAction
) => {
  const { type, payload } = action;

  switch (type) {
    case userEnum.USER_LIST_REQUEST:
      return { loading: true };
    case userEnum.USER_LIST_SUCCESS:
      return { loading: false, users: payload };
    case userEnum.USER_LIST_FAIL:
      return { loading: false, error: payload };
    case userEnum.USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case userEnum.USER_DELETE_REQUEST:
      return { loading: true };
    case userEnum.USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case userEnum.USER_DELETE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userGetDetailsReducer = (
  state = { user: {} },
  action: PayloadAction
) => {
  const { type, payload } = action;

  switch (type) {
    case userEnum.USER_DETAILS_REQUEST:
      return { loading: true };
    case userEnum.USER_DETAILS_SUCCESS:
      return { loading: false, success: true, user: payload };
    case userEnum.USER_DETAILS_FAIL:
      return { loading: false, error: payload };
    case userEnum.USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const userAdminUpdateReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case userEnum.USER_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case userEnum.USER_ADMIN_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case userEnum.USER_ADMIN_UPDATE_FAIL:
      return { loading: false, error: payload };
    case userEnum.USER_ADMIN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

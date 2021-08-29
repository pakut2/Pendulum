import { PayloadAction } from "@reduxjs/toolkit";
import { fileEnum } from "../enum/file.enum";

export const fileSignedUrlReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case fileEnum.FILE_URL_REQUEST:
      return { loading: true };
    case fileEnum.FILE_URL_SUCCESS:
      return {
        loading: false,
        url: payload,
      };
    case fileEnum.FILE_URL_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const fileS3PostReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case fileEnum.FILE_POST_REQUEST:
      return { loading: true };
    case fileEnum.FILE_POST_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case fileEnum.FILE_POST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const fileAvatarUpdateReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case fileEnum.FILE_AVATAR_UPDATE_REQUEST:
      return { loading: true };
    case fileEnum.FILE_AVATAR_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        user: payload,
      };
    case fileEnum.FILE_AVATAR_UPDATE_FAIL:
      return { loading: false, error: payload };
    case fileEnum.FILE_AVATAR_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
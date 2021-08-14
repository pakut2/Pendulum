import { PayloadAction } from "@reduxjs/toolkit";
import { ztmEnum } from "../enum/ztm.enum";

export const linesListReducer = (
  state = { lines: [] },
  action: PayloadAction
) => {
  const { type, payload } = action;

  switch (type) {
    case ztmEnum.ZTM_LIST_DETAILS_REQUEST:
      return { loading: true, lines: [] };
    case ztmEnum.ZTM_LIST_DETAILS_SUCCESS:
      return {
        loading: false,
        lines: payload,
      };
    case ztmEnum.ZTM_LIST_DETAILS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const getLocationReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case ztmEnum.ZTM_GET_LOCATION_REQUEST:
      return { loading: true };
    case ztmEnum.ZTM_GET_LOCATION_SUCCESS:
      return {
        loading: false,
        line: payload,
      };
    case ztmEnum.ZTM_GET_LOCATION_FAIL:
      return { loading: false, error: payload };
    case ztmEnum.ZTM_GET_LOCATION_RESET:
      return {};
    default:
      return state;
  }
};

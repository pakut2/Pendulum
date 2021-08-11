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

import {
  ZTM_LIST_DETAILS_FAIL,
  ZTM_LIST_DETAILS_REQUEST,
  ZTM_LIST_DETAILS_SUCCESS,
} from "../constants/ztmConstants";

export const linesListReducer = (state = { lines: [] }, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case ZTM_LIST_DETAILS_REQUEST:
      return { loading: true, lines: [] };
    case ZTM_LIST_DETAILS_SUCCESS:
      return {
        loading: false,
        lines: payload,
      };
    case ZTM_LIST_DETAILS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

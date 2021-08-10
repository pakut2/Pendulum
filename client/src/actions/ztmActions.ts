import axios from "axios";
import {
  ZTM_LIST_DETAILS_FAIL,
  ZTM_LIST_DETAILS_REQUEST,
  ZTM_LIST_DETAILS_SUCCESS,
} from "../constants/ztmConstants";

export const listLines = () => async (dispatch: any) => {
  try {
    dispatch({ type: ZTM_LIST_DETAILS_REQUEST });

    let { data } = await axios.get(
      "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/22313c56-5acf-41c7-a5fd-dc5dc72b3851/download/routes.json"
    );

    data = data[Object.keys(data)[0]].routes;

    const validData: Array<Object> = [];

    data.forEach((route: any) => {
      if (route.agencyId === 1 || route.agencyId === 2) {
        validData.push(route);
      }
    });

    dispatch({
      type: ZTM_LIST_DETAILS_SUCCESS,
      payload: validData,
    });
  } catch (err) {
    dispatch({
      type: ZTM_LIST_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

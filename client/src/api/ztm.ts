import axios from "axios";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ztmEnum } from "../store/enum/ztm.enum";

export const listLines =
  () => async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({ type: ztmEnum.ZTM_LIST_DETAILS_REQUEST });

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
        type: ztmEnum.ZTM_LIST_DETAILS_SUCCESS,
        payload: validData,
      });
    } catch (err) {
      dispatch({
        type: ztmEnum.ZTM_LIST_DETAILS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

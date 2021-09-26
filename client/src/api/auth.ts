import axios from "axios";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { authEnum } from "../store/enum/auth.enum";
import { userEnum } from "../store/enum/user.enum";

export const login = async (email: string, password: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.post(
    "/api/auth/login",
    { email, password },
    config
  );

  return data;
};

export const logout =
  () => async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userRegister");

    dispatch({
      type: authEnum.AUTH_LOGOUT,
    });

    dispatch({ type: userEnum.USER_UPDATE_RESET });

    dispatch({ type: userEnum.USER_GET_AUTH_RESET });

    try {
      await axios.post("/api/auth/logout");
    } catch (err: any) {
      dispatch({
        type: authEnum.AUTH_LOGOUT_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.post(
    "/api/auth/register",
    { name, email, password },
    config
  );
  return data;
};

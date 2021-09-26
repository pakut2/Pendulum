import axios from "axios";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { userEnum } from "../store/enum/user.enum";

export const getAuthenticatedUser = async () => {
  const { data } = await axios.get("/api/users/user");
  return data;
};

interface UserData {
  name: string;
  email: string;
  password?: string;
}

export const updateUser = async (
  id: string,
  { name, email, password }: UserData
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.put(
    `/api/users/${id}`,
    { name, email, password },
    config
  );
  return data;
};

export const listUsers = async () => {
  const { data } = await axios.get("/api/users");
  return data;
};

export const deleteUser = async (id: string) => {
  await axios.delete(`/api/users/${id}`);
};

export const getUserDetails = async (id: string) => {
  const { data } = await axios.get(`/api/users/${id}`);
  return data;
};

export const adminUpdateUser =
  (id: string, user: Object) =>
  async (dispatch: ThunkDispatch<void, unknown, AnyAction>) => {
    try {
      dispatch({ type: userEnum.USER_ADMIN_UPDATE_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.put(`/api/users/admin/${id}`, user, config);

      dispatch({
        type: userEnum.USER_ADMIN_UPDATE_SUCCESS,
      });
    } catch (err: any) {
      dispatch({
        type: userEnum.USER_ADMIN_UPDATE_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

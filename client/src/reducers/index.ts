import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./authReducers";

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

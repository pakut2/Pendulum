import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./authReducers";
import { getAuthenticatedUserReducer } from "./userReducers";

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  authenticatedUser: getAuthenticatedUserReducer,
});

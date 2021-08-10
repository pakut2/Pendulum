import { combineReducers } from "redux";
import { userLoginReducer, userRegisterReducer } from "./authReducers";
import {
  getAuthenticatedUserReducer,
  updateUserReducer,
  userListReducer,
  userDeleteReducer,
  userGetDetailsReducer,
  userAdminUpdateReducer,
} from "./userReducers";
import {
  postListReducer,
  postCreateReducer,
  postDeleteReducer,
} from "./postReducers";
import { linesListReducer } from "./ztmReducers";

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  authenticatedUser: getAuthenticatedUserReducer,
  userUpdate: updateUserReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userGetDetails: userGetDetailsReducer,
  userAdminUpdate: userAdminUpdateReducer,
  postList: postListReducer,
  postCreate: postCreateReducer,
  postDelete: postDeleteReducer,
  linesList: linesListReducer,
});

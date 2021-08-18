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
  postGetDetailsReducer,
  postDeleteReducer,
  postLikeReducer,
} from "./postReducers";
import { linesListReducer, getLocationReducer } from "./ztmReducers";

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  authenticatedUser: getAuthenticatedUserReducer,
  userUpdate: updateUserReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userGetDetails: userGetDetailsReducer,
  userAdminUpdate: userAdminUpdateReducer,
  postGetDetails: postGetDetailsReducer,
  postDelete: postDeleteReducer,
  postLike: postLikeReducer,
  linesList: linesListReducer,
  getLocation: getLocationReducer,
});

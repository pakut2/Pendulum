import { combineReducers } from "redux";
import {
  userLoginReducer,
  userRegisterReducer,
  emailConfirmationReducer,
  resendEmailReducer,
} from "./authReducers";
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
  postGetDetailsReducer,
  postCreateReducer,
  postDeleteReducer,
  postLikeReducer,
} from "./postReducers";
import { linesListReducer, getLocationReducer } from "./ztmReducers";

export default combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  emailConfirmation: emailConfirmationReducer,
  resendEmail: resendEmailReducer,
  authenticatedUser: getAuthenticatedUserReducer,
  userUpdate: updateUserReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userGetDetails: userGetDetailsReducer,
  userAdminUpdate: userAdminUpdateReducer,
  postList: postListReducer,
  postGetDetails: postGetDetailsReducer,
  postCreate: postCreateReducer,
  postDelete: postDeleteReducer,
  postLike: postLikeReducer,
  linesList: linesListReducer,
  getLocation: getLocationReducer,
});

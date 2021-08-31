import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? //@ts-ignore
    JSON.parse(localStorage.getItem("userInfo"))
  : null;

const userRegisterFromStorage = localStorage.getItem("userRegister")
  ? //@ts-ignore
    JSON.parse(localStorage.getItem("userRegister"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userRegister: { userInfo: userRegisterFromStorage },
};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

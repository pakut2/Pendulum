import { authEnum } from "../../../store/enum/auth.enum";
import {
  userLoginReducer,
  userRegisterReducer,
} from "../../../store/reducers/authReducers";
import { mockUser } from "../../utils/mocks/mockUser";

describe("userLoginReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(userLoginReducer(undefined, {})).toEqual({});
  });

  it("should handle request", () => {
    // @ts-ignore
    expect(userLoginReducer({}, { type: authEnum.AUTH_LOGIN_REQUEST })).toEqual(
      { loading: true }
    );
  });

  it("should handle success", () => {
    expect(
      userLoginReducer(
        {},
        // @ts-ignore
        { payload: mockUser, type: authEnum.AUTH_LOGIN_SUCCESS }
      )
    ).toEqual({ loading: false, userInfo: mockUser });
  });

  it("should handle fail", () => {
    expect(
      userLoginReducer(
        {},
        // @ts-ignore
        { payload: "error", type: authEnum.AUTH_LOGIN_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });

  it("should handle logout", () => {
    expect(
      userLoginReducer(
        {},
        // @ts-ignore
        { type: authEnum.AUTH_LOGOUT }
      )
    ).toEqual({});
  });
});

describe("userRegisterReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(userRegisterReducer(undefined, {})).toEqual({});
  });

  it("should handle request", () => {
    expect(
      // @ts-ignore
      userRegisterReducer({}, { type: authEnum.AUTH_REGISTER_REQUEST })
    ).toEqual({ loading: true });
  });

  it("should handle success", () => {
    expect(
      userRegisterReducer(
        {},
        // @ts-ignore
        { payload: mockUser, type: authEnum.AUTH_REGISTER_SUCCESS }
      )
    ).toEqual({ loading: false, userInfo: mockUser });
  });

  it("should handle fail", () => {
    expect(
      userRegisterReducer(
        {},
        // @ts-ignore
        { payload: "error", type: authEnum.AUTH_REGISTER_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });

  it("should handle logout", () => {
    expect(
      userRegisterReducer(
        {},
        // @ts-ignore
        { type: authEnum.AUTH_REGISTER_RESET }
      )
    ).toEqual({});
  });
});

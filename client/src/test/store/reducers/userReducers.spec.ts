import { userEnum } from "../../../store/enum/user.enum";
import {
  getAuthenticatedUserReducer,
  updateUserReducer,
  userAdminUpdateReducer,
  userDeleteReducer,
  userGetDetailsReducer,
  userListReducer,
} from "../../../store/reducers/userReducers";
import { mockUser } from "../../utils/mocks/mockUser";

describe("getAuthenticatedUserReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(getAuthenticatedUserReducer(undefined, {})).toEqual({});
  });

  it("should handle request", () => {
    expect(
      // @ts-ignore
      getAuthenticatedUserReducer({}, { type: userEnum.USER_GET_AUTH_REQUEST })
    ).toEqual({ loading: true });
  });

  it("should handle success", () => {
    expect(
      getAuthenticatedUserReducer(
        {},
        // @ts-ignore
        { payload: mockUser, type: userEnum.USER_GET_AUTH_SUCCESS }
      )
    ).toEqual({ loading: false, user: mockUser });
  });

  it("should handle fail", () => {
    expect(
      getAuthenticatedUserReducer(
        {},
        // @ts-ignore
        { payload: "error", type: userEnum.USER_GET_AUTH_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });

  it("should handle reset", () => {
    expect(
      getAuthenticatedUserReducer(
        {},
        // @ts-ignore
        { type: userEnum.USER_GET_AUTH_RESET }
      )
    ).toEqual({});
  });
});

describe("updateUserReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(updateUserReducer(undefined, {})).toEqual({});
  });

  it("should handle request", () => {
    expect(
      // @ts-ignore
      updateUserReducer({}, { type: userEnum.USER_UPDATE_REQUEST })
    ).toEqual({ loading: true });
  });

  it("should handle success", () => {
    expect(
      updateUserReducer(
        {},
        // @ts-ignore
        { payload: mockUser, type: userEnum.USER_UPDATE_SUCCESS }
      )
    ).toEqual({ loading: false, success: true, userInfo: mockUser });
  });

  it("should handle fail", () => {
    expect(
      updateUserReducer(
        {},
        // @ts-ignore
        { payload: "error", type: userEnum.USER_UPDATE_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });

  it("should handle reset", () => {
    expect(
      updateUserReducer(
        {},
        // @ts-ignore
        { type: userEnum.USER_UPDATE_RESET }
      )
    ).toEqual({});
  });
});

describe("userListReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(userListReducer(undefined, {})).toEqual({ users: [] });
  });

  it("should handle request", () => {
    expect(
      // @ts-ignore
      userListReducer({ users: [] }, { type: userEnum.USER_LIST_REQUEST })
    ).toEqual({ loading: true });
  });

  it("should handle success", () => {
    expect(
      userListReducer(
        { users: [] },
        // @ts-ignore
        { payload: [mockUser], type: userEnum.USER_LIST_SUCCESS }
      )
    ).toEqual({ loading: false, users: [mockUser] });
  });

  it("should handle fail", () => {
    expect(
      userListReducer(
        { users: [] },
        // @ts-ignore
        { payload: "error", type: userEnum.USER_LIST_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });

  it("should handle reset", () => {
    expect(
      userListReducer(
        { users: [] },
        // @ts-ignore
        { type: userEnum.USER_LIST_RESET }
      )
    ).toEqual({ users: [] });
  });
});

describe("userDeleteReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(userDeleteReducer(undefined, {})).toEqual({});
  });

  it("should handle request", () => {
    expect(
      // @ts-ignore
      userDeleteReducer({}, { type: userEnum.USER_DELETE_REQUEST })
    ).toEqual({ loading: true });
  });

  it("should handle success", () => {
    expect(
      userDeleteReducer(
        {},
        // @ts-ignore
        { type: userEnum.USER_DELETE_SUCCESS }
      )
    ).toEqual({ loading: false, success: true });
  });

  it("should handle fail", () => {
    expect(
      userDeleteReducer(
        {},
        // @ts-ignore
        { payload: "error", type: userEnum.USER_DELETE_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });

  it("should handle reset", () => {
    expect(
      userDeleteReducer(
        {},
        // @ts-ignore
        { type: userEnum.USER_DELETE_RESET }
      )
    ).toEqual({});
  });
});

describe("userGetDetailsReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(userGetDetailsReducer(undefined, {})).toEqual({ user: {} });
  });

  it("should handle request", () => {
    expect(
      userGetDetailsReducer(
        { user: {} },
        // @ts-ignore
        { type: userEnum.USER_DETAILS_REQUEST }
      )
    ).toEqual({ loading: true });
  });

  it("should handle success", () => {
    expect(
      userGetDetailsReducer(
        { user: {} },
        // @ts-ignore
        { payload: mockUser, type: userEnum.USER_DETAILS_SUCCESS }
      )
    ).toEqual({ loading: false, success: true, user: mockUser });
  });

  it("should handle fail", () => {
    expect(
      userGetDetailsReducer(
        { user: {} },
        // @ts-ignore
        { payload: "error", type: userEnum.USER_DETAILS_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });

  it("should handle reset", () => {
    expect(
      userGetDetailsReducer(
        { user: {} },
        // @ts-ignore
        { type: userEnum.USER_DETAILS_RESET }
      )
    ).toEqual({});
  });
});

describe("userAdminUpdateReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(userAdminUpdateReducer(undefined, {})).toEqual({});
  });

  it("should handle request", () => {
    expect(
      // @ts-ignore
      userAdminUpdateReducer({}, { type: userEnum.USER_ADMIN_UPDATE_REQUEST })
    ).toEqual({ loading: true });
  });

  it("should handle success", () => {
    expect(
      userAdminUpdateReducer(
        {},
        // @ts-ignore
        { type: userEnum.USER_ADMIN_UPDATE_SUCCESS }
      )
    ).toEqual({ loading: false, success: true });
  });

  it("should handle fail", () => {
    expect(
      userAdminUpdateReducer(
        {},
        // @ts-ignore
        { payload: "error", type: userEnum.USER_ADMIN_UPDATE_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });

  it("should handle reset", () => {
    expect(
      userAdminUpdateReducer(
        {},
        // @ts-ignore
        { type: userEnum.USER_ADMIN_UPDATE_RESET }
      )
    ).toEqual({});
  });
});

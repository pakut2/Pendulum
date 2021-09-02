import { mailEnum } from "../../../store/enum/mail.enum";
import {
  emailConfirmationReducer,
  resendEmailReducer,
} from "../../../store/reducers/mailReducers";

describe("emailConfirmationReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(emailConfirmationReducer(undefined, {})).toEqual({});
  });

  it("should handle request", () => {
    expect(
      // @ts-ignore
      emailConfirmationReducer({}, { type: mailEnum.MAIL_CONFIRM_REQUEST })
    ).toEqual({ loading: true });
  });

  it("should handle success", () => {
    expect(
      emailConfirmationReducer(
        {},
        // @ts-ignore
        { type: mailEnum.MAIL_CONFIRM_SUCCESS }
      )
    ).toEqual({ loading: false, success: true });
  });

  it("should handle fail", () => {
    expect(
      emailConfirmationReducer(
        {},
        // @ts-ignore
        { payload: "error", type: mailEnum.MAIL_CONFIRM_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });

  it("should handle logout", () => {
    expect(
      emailConfirmationReducer(
        {},
        // @ts-ignore
        { type: mailEnum.MAIL_CONFIRM_RESET }
      )
    ).toEqual({});
  });
});

describe("resendEmailReducer", () => {
  it("should return initial state", () => {
    // @ts-ignore
    expect(resendEmailReducer(undefined, {})).toEqual({});
  });

  it("should handle request", () => {
    expect(
      // @ts-ignore
      resendEmailReducer({}, { type: mailEnum.MAIL_RESEND_REQUEST })
    ).toEqual({ loading: true });
  });

  it("should handle success", () => {
    expect(
      resendEmailReducer(
        {},
        // @ts-ignore
        { type: mailEnum.MAIL_RESEND_SUCCESS }
      )
    ).toEqual({ loading: false, success: true });
  });

  it("should handle fail", () => {
    expect(
      resendEmailReducer(
        {},
        // @ts-ignore
        { payload: "error", type: mailEnum.MAIL_RESEND_FAIL }
      )
    ).toEqual({ loading: false, error: "error" });
  });

  it("should handle reset", () => {
    expect(
      resendEmailReducer(
        {},
        // @ts-ignore
        { type: mailEnum.MAIL_RESEND_RESET }
      )
    ).toEqual({});
  });
});

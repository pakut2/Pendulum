import { PayloadAction } from "@reduxjs/toolkit";
import { mailEnum } from "../enum/mail.enum";

export const emailConfirmationReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case mailEnum.MAIL_CONFIRM_REQUEST:
      return { loading: true };
    case mailEnum.MAIL_CONFIRM_SUCCESS:
      return { loading: false, success: true };
    case mailEnum.MAIL_CONFIRM_FAIL:
      return { loading: false, error: payload };
    case mailEnum.MAIL_CONFIRM_RESET:
      return {};
    default:
      return state;
  }
};

export const resendEmailReducer = (state = {}, action: PayloadAction) => {
  const { type, payload } = action;

  switch (type) {
    case mailEnum.MAIL_RESEND_REQUEST:
      return { loading: true };
    case mailEnum.MAIL_RESEND_SUCCESS:
      return { loading: false, success: true };
    case mailEnum.MAIL_RESEND_FAIL:
      return { loading: false, error: payload };
    case mailEnum.MAIL_RESEND_RESET:
      return {};
    default:
      return state;
  }
};

import axios from "axios";
import { resendConfirmationEmail, sendConfirmationToken } from "../../api/mail";

describe("when sending confirmation token", () => {
  it("should send the token", async () => {
    jest.spyOn(axios, "post").mockReturnValue(Promise.resolve());

    sendConfirmationToken("1");
  });
});

describe("when resending email", () => {
  it("should resend the email", async () => {
    jest.spyOn(axios, "post").mockReturnValue(Promise.resolve());

    resendConfirmationEmail("1");
  });
});

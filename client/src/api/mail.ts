import axios from "axios";

export const sendConfirmationToken = async (token: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  await axios.post("/api/email-confirmation/confirm", { token }, config);
};

export const resendConfirmationEmail = async (id: string) => {
  await axios.post(`/api/email-confirmation/resend-confirmation-link/${id}`);
};

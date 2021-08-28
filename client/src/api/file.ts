import axios from "axios";

export const getSignedUrl = async (filename: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = await axios.post("/api/files", { filename }, config);

  return url;
};

export const updateAvatar = async (key: string) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const user = await axios.post("/api/users/upload", { key }, config);

  return user;
};

import axios from "axios";
import { getSignedUrl, updateAvatar } from "../../api/file";
import { mockUser } from "../utils/mocks/mockUser";

describe("when getting signed URL", () => {
  it("should return url", async () => {
    jest
      .spyOn(axios, "post")
      .mockReturnValue(Promise.resolve({ presignedURL: "", key: "" }));

    const url = await getSignedUrl("filename");

    expect(url).toEqual({ presignedURL: "1", key: "1" });
  });
});

describe("when updating avatar", () => {
  it("should return the updated user", async () => {
    jest.spyOn(axios, "post").mockReturnValue(Promise.resolve(mockUser));

    const user = await updateAvatar("1");

    expect(user).toEqual(mockUser);
  });
});

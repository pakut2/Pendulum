import axios from "axios";
import { login, logout, register } from "../../api/auth";
import store from "../../store/store";
import { mockUser } from "../utils/mocks/mockUser";

// jest.mock("axios");
// const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("on login", () => {
  it("should return the logged in user", async () => {
    // mockedAxios.post.mockReturnValue(Promise.resolve({ data: mockUser }));

    jest
      .spyOn(axios, "post")
      .mockReturnValue(Promise.resolve({ data: mockUser }));

    const user = await login(mockUser.email, mockUser.password);
    expect(user).toEqual(mockUser);
  });
});

describe("on register", () => {
  it("should return registered user", async () => {
    jest
      .spyOn(axios, "post")
      .mockReturnValue(Promise.resolve({ data: mockUser }));

    const user = await register(
      mockUser.name,
      mockUser.email,
      mockUser.password
    );
    expect(user).toEqual(mockUser);
  });
});

describe("on logout", () => {
  it("should log the user out", async () => {
    jest.spyOn(axios, "post").mockReturnValueOnce(Promise.resolve());

    logout();
  });
});

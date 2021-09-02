import axios from "axios";
import {
  adminUpdateUser,
  deleteUser,
  getAuthenticatedUser,
  getUserDetails,
  listUsers,
  updateUser,
} from "../../api/user";
import { mockUser } from "../utils/mocks/mockUser";

describe("when getting the authenticated user", () => {
  it("should return the user", async () => {
    jest
      .spyOn(axios, "get")
      .mockReturnValue(Promise.resolve({ data: mockUser }));

    const user = await getAuthenticatedUser();

    expect(user).toEqual(mockUser);
  });
});

describe("when updating the user", () => {
  it("should return the user", async () => {
    jest
      .spyOn(axios, "put")
      .mockReturnValue(Promise.resolve({ data: mockUser }));

    const user = await updateUser(mockUser.id, mockUser);

    expect(user).toEqual(mockUser);
  });
});

describe("when getting all users", () => {
  it("should return the users", async () => {
    jest
      .spyOn(axios, "get")
      .mockReturnValue(Promise.resolve({ data: [mockUser] }));

    const users = await listUsers();

    expect(users).toEqual([mockUser]);
  });
});

describe("when deleting the user", () => {
  it("should return the user", async () => {
    jest.spyOn(axios, "delete").mockReturnValue(Promise.resolve());
    await deleteUser(mockUser.id);
  });
});

describe("when getting the user", () => {
  it("should return the user", async () => {
    jest
      .spyOn(axios, "get")
      .mockReturnValue(Promise.resolve({ data: mockUser }));

    const users = await getUserDetails(mockUser.id);

    expect(users).toEqual(mockUser);
  });
});

describe("when updating the user as admin", () => {
  it("should return the user", async () => {
    jest.spyOn(axios, "put").mockReturnValue(Promise.resolve());

    await adminUpdateUser(mockUser.id, mockUser);
  });
});

import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
import ProfileView from "../../views/ProfileView";
import { createMemoryHistory } from "history";
import thunk from "redux-thunk";
import { Store } from "redux";
import configureMockStore from "redux-mock-store";
import { userEnum } from "../../store/enum/user.enum";
import { fileEnum } from "../../store/enum/file.enum";

const mockStore = configureMockStore([thunk]);

let storeMock: Store;

beforeEach(() => {
  storeMock = mockStore({
    userLogin: {
      userInfo: {
        id: "1",
        email: "test@test.test",
        name: "test",
        role: "user",
        isEmailConfirmed: true,
        avatar: null,
      },
      loading: false,
    },
    authenticatedUser: { user: { id: "1" } },
    userUpdate: { success: false },
    fileSignedUrl: {
      error: null,
    },
    fileS3Post: {
      error: null,
    },
    fileAvatarUpdate: {
      success: true,
    },
  });
});

describe("ProfileView", () => {
  it("should render component", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ProfileView />
        </BrowserRouter>
      </Provider>
    );
  });

  describe("when user is not logged in", () => {
    it("should redirect to /login", () => {
      const history = createMemoryHistory();

      render(
        <Provider store={store}>
          <Router history={history}>
            <ProfileView />
          </Router>
        </Provider>
      );

      expect(history.location.pathname).toBe("/login");
    });
  });

  describe("on component mount", () => {
    it("should fetch authenticated user", () => {
      storeMock = mockStore({
        userLogin: {
          userInfo: {
            id: "1",
            email: "test@test.test",
            name: "test",
            role: "user",
            isEmailConfirmed: true,
            avatar: null,
          },
          loading: false,
        },
        authenticatedUser: {},
        userUpdate: { success: false },
        fileSignedUrl: {
          error: null,
        },
        fileS3Post: {
          error: null,
        },
        fileAvatarUpdate: {
          success: true,
        },
      });

      render(
        <Provider store={storeMock}>
          <BrowserRouter>
            <ProfileView />
          </BrowserRouter>
        </Provider>
      );

      // @ts-ignore
      expect(storeMock.getActions()).toContainEqual({
        type: userEnum.USER_GET_AUTH_REQUEST,
      });
    });
  });

  describe("on form input element change", () => {
    it("should fire onChange function", async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <ProfileView />
          </BrowserRouter>
        </Provider>
      );

      fireEvent.click(screen.getByText(/Edit Profile/));

      fireEvent.change(screen.getByLabelText("Name"), {
        target: { value: "test name" },
      });
      expect(screen.getByDisplayValue("test name")).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText("Email Address"), {
        target: { value: "test email" },
      });
      expect(screen.getByDisplayValue("test email")).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "test password" },
      });
      expect(screen.getByDisplayValue("test password")).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText("Confirm Password"), {
        target: { value: "test confirm password" },
      });
      expect(
        screen.getByDisplayValue("test confirm password")
      ).toBeInTheDocument();
    });
  });

  describe("on form submit", () => {
    it("should dispatch update type", () => {
      render(
        <Provider store={storeMock}>
          <BrowserRouter>
            <ProfileView />
          </BrowserRouter>
        </Provider>
      );

      fireEvent.click(screen.getByText(/Edit Profile/));
      fireEvent.click(screen.getByText(/Update/));

      // @ts-ignore
      expect(storeMock.getActions()).toContainEqual({
        type: userEnum.USER_UPDATE_REQUEST,
      });
    });
  });

  describe("when uploading file", () => {
    it("should upload the file", () => {
      render(
        <Provider store={storeMock}>
          <BrowserRouter>
            <ProfileView />
          </BrowserRouter>
        </Provider>
      );

      const file = new File([], "test.png", {
        type: "image/png",
      });

      fireEvent.click(screen.getByText(/Edit Profile/));
      fireEvent.change(screen.getByLabelText("Avatar"), {
        target: { files: [file] },
      });

      // @ts-ignore
      expect(screen.getByLabelText("Avatar").files[0].name).toBe("test.png");
      // @ts-ignore
      expect(screen.getByLabelText("Avatar").files.length).toBe(1);
    });
  });
});

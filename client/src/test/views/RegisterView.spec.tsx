import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
import RegisterView from "../../views/RegisterView";
import thunk from "redux-thunk";
import { Store } from "redux";
import configureMockStore from "redux-mock-store";
import { createMemoryHistory } from "history";
import { authEnum } from "../../store/enum/auth.enum";

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
    userRegister: {},
  });
});

describe("RegisterView", () => {
  it("should render component", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RegisterView />
        </BrowserRouter>
      </Provider>
    );
  });

  describe("when user is logged in", () => {
    it("should redirect to /dashboard", () => {
      const history = createMemoryHistory();

      render(
        <Provider store={storeMock}>
          <Router history={history}>
            <RegisterView />
          </Router>
        </Provider>
      );

      expect(history.location.pathname).toBe("/dashboard");
    });
  });

  describe("when user has registered", () => {
    it("should redirect to /login", () => {
      const history = createMemoryHistory();

      storeMock = mockStore({
        userLogin: {},
        userRegister: {
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
      });

      render(
        <Provider store={storeMock}>
          <Router history={history}>
            <RegisterView />
          </Router>
        </Provider>
      );

      expect(history.location.pathname).toBe("/login");
    });
  });

  describe("on form input element change", () => {
    it("should fire onChange function", async () => {
      render(
        <Provider store={store}>
          <BrowserRouter>
            <RegisterView />
          </BrowserRouter>
        </Provider>
      );

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
    it("should dispatch register type", () => {
      render(
        <Provider store={storeMock}>
          <BrowserRouter>
            <RegisterView />
          </BrowserRouter>
        </Provider>
      );

      fireEvent.click(screen.getByText("Register"));

      // @ts-ignore
      expect(storeMock.getActions()).toContainEqual({
        type: authEnum.AUTH_REGISTER_REQUEST,
      });
    });
  });
});

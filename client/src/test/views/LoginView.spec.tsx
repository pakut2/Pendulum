import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
import LoginView from "../../views/LoginView";
import thunk from "redux-thunk";
import { Store } from "redux";
import configureMockStore from "redux-mock-store";
import { createMemoryHistory } from "history";
import { authEnum } from "../../store/enum/auth.enum";
import { mailEnum } from "../../store/enum/mail.enum";

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
    userRegister: {
      userInfo: { id: "1" },
    },
    resendEmail: {
      success: true,
    },
    emailConfirmation: {
      success: true,
    },
  });
});

describe("LoginView", () => {
  it("should render component", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginView />
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
            <LoginView />
          </Router>
        </Provider>
      );

      expect(history.location.pathname).toBe("/dashboard");
    });
  });

  describe("on form input element change", () => {
    it("should fire onChange function", async () => {
      render(
        <Provider store={storeMock}>
          <BrowserRouter>
            <LoginView />
          </BrowserRouter>
        </Provider>
      );

      fireEvent.change(screen.getByLabelText("Email Address"), {
        target: { value: "test email" },
      });
      expect(screen.getByDisplayValue("test email")).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "test password" },
      });
      expect(screen.getByDisplayValue("test password")).toBeInTheDocument();
    });
  });

  describe("on form submit", () => {
    it("should login user", () => {
      render(
        <Provider store={storeMock}>
          <BrowserRouter>
            <LoginView />
          </BrowserRouter>
        </Provider>
      );

      fireEvent.click(screen.getByTestId("sign-in"));

      // @ts-ignore
      expect(storeMock.getActions()).toContainEqual({
        type: authEnum.AUTH_LOGIN_REQUEST,
      });
    });
  });

  describe("on mail resend click", () => {
    it("should dispatch mail resend type", () => {
      render(
        <Provider store={storeMock}>
          <BrowserRouter>
            <LoginView />
          </BrowserRouter>
        </Provider>
      );

      fireEvent.click(screen.getByText(/Click to resend email/));
      fireEvent.click(screen.getByTestId("resend-email-btn"));

      // @ts-ignore
      expect(storeMock.getActions()).toContainEqual({
        type: mailEnum.MAIL_RESEND_REQUEST,
      });
    });
  });
});

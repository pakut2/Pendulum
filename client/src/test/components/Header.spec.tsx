import React from "react";
import Header from "../../components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { authEnum } from "../../store/enum/auth.enum";

const mockStore = configureMockStore([thunk]);

let storeMock: any;

beforeEach(() => {
  storeMock = mockStore({
    userLogin: {
      userInfo: {
        id: "1",
        email: "test@test.test",
        name: "test",
        role: "admin",
        isEmailConfirmed: true,
        avatar: null,
      },
      loading: false,
    },
  });
});

describe("Header", () => {
  it("should render component", async () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
  });

  describe("when admin is logged in", () => {
    it("should display admin dropdown", async () => {
      render(
        <Provider store={storeMock}>
          <Router>
            <Header />
          </Router>
        </Provider>
      );

      expect(screen.getByText("Admin")).toBeInTheDocument();
    });
  });

  describe("when logout is clicked", () => {
    it("should dispatch type: AUTH_LOGOUT", async () => {
      render(
        <Provider store={storeMock}>
          <Router>
            <Header />
          </Router>
        </Provider>
      );

      fireEvent.click(screen.getByText("test"));
      fireEvent.click(screen.getByText("Logout"));

      await expect(storeMock.getActions()).toContainEqual({
        type: authEnum.AUTH_LOGOUT,
      });
    });
  });
});

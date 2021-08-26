import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
import LandingView from "../../views/LandingView";
import thunk from "redux-thunk";
import { Store } from "redux";
import configureMockStore from "redux-mock-store";
import { createMemoryHistory } from "history";

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
  });
});

describe("LandingView", () => {
  it("should render component", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LandingView />
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
            <LandingView />
          </Router>
        </Provider>
      );

      expect(history.location.pathname).toBe("/dashboard");
    });
  });
});

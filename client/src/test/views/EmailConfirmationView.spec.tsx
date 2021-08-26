import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
import EmailConfirmationView from "../../views/EmailConfirmationView";
import { createMemoryHistory } from "history";
import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";
import { Store } from "redux";
import { mailEnum } from "../../store/enum/mail.enum";

const routeComponentPropsMock = {
  history: {} as never,
  location: {} as never,
  match: { params: { token: "" } } as never,
};

const mockStore = configureMockStore([thunk]);

let storeMock: Store;

beforeEach(() => {
  storeMock = mockStore({
    emailConfirmation: {
      success: true,
    },
  });
});

describe("EmailConfirmationView", () => {
  it("should render component", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <EmailConfirmationView {...routeComponentPropsMock} />
        </BrowserRouter>
      </Provider>
    );
  });

  describe("when email has been confirmed", () => {
    it("should redirect to /login", () => {
      const history = createMemoryHistory();

      render(
        <Provider store={storeMock}>
          <Router history={history}>
            <EmailConfirmationView {...routeComponentPropsMock} />
          </Router>
        </Provider>
      );

      expect(history.location.pathname).toBe("/login");
    });
  });

  describe("when confirmation button is clicked", () => {
    it("should confirm email", () => {
      render(
        <Provider store={storeMock}>
          <BrowserRouter>
            <EmailConfirmationView {...routeComponentPropsMock} />
          </BrowserRouter>
        </Provider>
      );

      fireEvent.click(screen.getByText(/Confirm Email Address/));

      // @ts-ignore
      expect(storeMock.getActions()).toContainEqual({
        type: mailEnum.MAIL_CONFIRM_REQUEST,
      });
    });
  });
});

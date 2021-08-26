import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
import UserEditView from "../../views/UserEditView";
import thunk from "redux-thunk";
import { Store } from "redux";
import configureMockStore from "redux-mock-store";
import { createMemoryHistory } from "history";
import { userEnum } from "../../store/enum/user.enum";

const routeComponentPropsMock = {
  history: {} as never,
  location: {} as never,
  match: { params: { id: "" } } as never,
};

const mockStore = configureMockStore([thunk]);

let storeMock: Store;

beforeEach(() => {
  storeMock = mockStore({
    userGetDetails: {
      user: { id: "" },
    },
    userAdminUpdate: {
      success: true,
    },
  });
});

describe("UserEditView", () => {
  it("should render component", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <UserEditView {...routeComponentPropsMock} />
        </BrowserRouter>
      </Provider>
    );
  });

  describe("when the user is updated", () => {
    it("should redirect to /admin/userlist", () => {
      const history = createMemoryHistory();

      render(
        <Provider store={storeMock}>
          <Router history={history}>
            <UserEditView {...routeComponentPropsMock} />
          </Router>
        </Provider>
      );

      expect(history.location.pathname).toBe("/admin/userlist");
    });
  });

  describe("on form input element change", () => {
    it("should fire onChange function", async () => {
      render(
        <Provider store={storeMock}>
          <BrowserRouter>
            <UserEditView {...routeComponentPropsMock} />
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

      fireEvent.click(screen.getByLabelText("Is Admin"));
      expect(screen.getByLabelText("Is Admin")).toBeChecked();
    });
  });

  describe("on form submit", () => {
    it("should update the user if current user is admin", () => {
      render(
        <Provider store={storeMock}>
          <BrowserRouter>
            <UserEditView {...routeComponentPropsMock} />
          </BrowserRouter>
        </Provider>
      );

      fireEvent.click(screen.getByText("Update"));

      // @ts-ignore
      expect(storeMock.getActions()).toContainEqual({
        type: userEnum.USER_ADMIN_UPDATE_REQUEST,
      });
    });
  });
});

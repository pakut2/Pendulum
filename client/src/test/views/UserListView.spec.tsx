import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
import UserListView from "../../views/UserListView";
import { userEnum } from "../../store/enum/user.enum";
import thunk from "redux-thunk";
import { Store } from "redux";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore([thunk]);

let storeMock: Store;

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
    userGetDetails: { user: { id: "1" } },
    userList: {
      users: [
        {
          id: "1",
          email: "test@test.test",
          name: "test",
          role: "admin",
          isEmailConfirmed: true,
          avatar: null,
        },
      ],
    },
    userDelete: { success: true },
  });
});

describe("UserListView", () => {
  it("should render component", async () => {
    render(
      <Provider store={store}>
        <Router>
          <UserListView />
        </Router>
      </Provider>
    );
  });

  describe("on clicking delete user button", () => {
    it("should delete the user", () => {
      window.confirm = jest.fn(() => true);

      render(
        <Provider store={storeMock}>
          <Router>
            <UserListView />
          </Router>
        </Provider>
      );

      fireEvent.click(screen.getByTestId("delete-btn"));

      // @ts-ignore
      expect(storeMock.getActions()).toContainEqual({
        type: userEnum.USER_DELETE_REQUEST,
      });
    });
  });
});

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
import DashboardView from "../../views/DashboardView";
import { Store } from "redux";
import thunk from "redux-thunk";
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
        role: "user",
        isEmailConfirmed: true,
        avatar: null,
      },
      loading: false,
    },
    userRegister: {
      userInfo: {
        id: "1",
      },
    },
    postList: {
      posts: [],
    },
    postCreate: {
      success: true,
    },
    postGetDetails: {
      post: {
        line: "199",
      },
    },
    postDelete: {
      success: true,
    },
    postLike: {
      success: true,
    },
    getLocation: {
      line: {
        routeId: "1",
      },
    },
    resendEmail: {
      success: true,
    },
  });
});

describe("DashboardView", () => {
  it("should render component", async () => {
    render(
      <Provider store={store}>
        <Router>
          <DashboardView />
        </Router>
      </Provider>
    );
  });

  describe("when certain states have value", () => {
    it("should clear those states", () => {
      render(
        <Provider store={storeMock}>
          <Router>
            <DashboardView />
          </Router>
        </Provider>
      );

      // @ts-expect-error
      expect(storeMock.getActions()).toContainEqual({
        type: "POST_LIST_REQUEST",
        // @ts-expect-error
        type: "POST_CREATE_RESET",
        // @ts-expect-error
        type: "AUTH_REGISTER_RESET",
        // @ts-expect-error
        type: "POST_GET_DETAILS_RESET",
        // @ts-expect-error
        type: "ZTM_GET_LOCATION_RESET",
        // @ts-expect-error
        type: "MAIL_RESEND_RESEND",
      });
    });
  });
});

import React from "react";
import { BrowserRouter, Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import CreatePostView from "../../views/CreatePostView";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { postEnum } from "../../store/enum/post.enum";
import { createMemoryHistory } from "history";
import store from "../../store/store";
import { Store } from "redux";

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
    linesList: {
      loading: false,
      lines: [{ routeShortName: "199", routeLongName: "oliwa-wrzeszcz" }],
    },
    postCreate: {
      success: true,
    },
  });
});

describe("CreatePostView", () => {
  it("should render component", async () => {
    render(
      <Provider store={storeMock}>
        <BrowserRouter>
          <CreatePostView />
        </BrowserRouter>
      </Provider>
    );
  });

  describe("on form submit", () => {
    it("should dispatch type", async () => {
      render(
        <Provider store={storeMock}>
          <BrowserRouter>
            <CreatePostView />
          </BrowserRouter>
        </Provider>
      );

      expect(screen.getByText("Report")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Report"));

      // @ts-ignore
      expect(storeMock.getActions()).toContainEqual({
        type: postEnum.POST_CREATE_REQUEST,
      });
    });
  });

  describe("on form input element change", () => {
    it("should fire onChange function", async () => {
      render(
        <Provider store={storeMock}>
          <BrowserRouter>
            <CreatePostView />
          </BrowserRouter>
        </Provider>
      );

      fireEvent.change(screen.getByLabelText("Vehicle Code"), {
        target: { value: "test vehicleCode" },
      });
      expect(screen.getByDisplayValue("test vehicleCode")).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText("Closest Stop"), {
        target: { value: "test stop name" },
      });
      expect(screen.getByDisplayValue("test stop name")).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText("Description"), {
        target: { value: "test desc" },
      });
      expect(screen.getByDisplayValue("test desc")).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText("Line"), {
        target: { value: "199" },
      });
      expect(screen.getByDisplayValue("199")).toBeInTheDocument();

      fireEvent.change(screen.getByLabelText("Direction"), {
        target: { value: "oliwa" },
      });
      expect(screen.getByDisplayValue("oliwa")).toBeInTheDocument();
    });
  });

  describe("when user is not logged in", () => {
    it("should redirect to /login", () => {
      const history = createMemoryHistory();

      render(
        <Provider store={store}>
          <Router history={history}>
            <CreatePostView />
          </Router>
        </Provider>
      );

      expect(history.location.pathname).toBe("/login");
    });
  });

  describe("when post is created", () => {
    it("should redirect to /dashboard", () => {
      const history = createMemoryHistory();

      render(
        <Provider store={storeMock}>
          <Router history={history}>
            <CreatePostView />
          </Router>
        </Provider>
      );

      expect(history.location.pathname).toBe("/dashboard");
    });
  });
});

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Post from "../../components/Post";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { postEnum } from "../../store/enum/post.enum";

const componentPropsMock = {
  post: { author: { id: "1", avatar: { url: "" } }, likes: [] },
};

const mockStore = configureMockStore([thunk]);

let storeMock: any;

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

describe("Post", () => {
  it("should render component", () => {
    render(
      <Provider store={storeMock}>
        <Router>
          <Post {...componentPropsMock} />
        </Router>
      </Provider>
    );
  });

  describe("on delete button click", () => {
    it("should dispatch type when user is the author", async () => {
      window.confirm = jest.fn(() => true);

      render(
        <Provider store={storeMock}>
          <Router>
            <Post {...componentPropsMock} />
          </Router>
        </Provider>
      );

      expect(screen.getByTestId("delete-btn")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("delete-btn"));

      await expect(storeMock.getActions()).toContainEqual({
        type: postEnum.POST_DELETE_REQUEST,
      });
    });

    it("should dispatch type when user is admin", async () => {
      window.confirm = jest.fn(() => true);

      storeMock = mockStore({
        userLogin: {
          userInfo: {
            id: "2",
            email: "test@test.test",
            name: "test",
            role: "admin",
            isEmailConfirmed: true,
            avatar: null,
          },
          loading: false,
        },
      });

      render(
        <Provider store={storeMock}>
          <Router>
            <Post {...componentPropsMock} />
          </Router>
        </Provider>
      );

      expect(screen.getByTestId("delete-btn-admin")).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("delete-btn-admin"));

      await expect(storeMock.getActions()).toContainEqual({
        type: postEnum.POST_DELETE_REQUEST,
      });
    });
  });

  it("should dispatch when like button is clicked", async () => {
    render(
      <Provider store={storeMock}>
        <Router>
          <Post {...componentPropsMock} />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId("like-btn")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("like-btn"));

    await expect(storeMock.getActions()).toContainEqual({
      type: postEnum.POST_LIKE_REQUEST,
    });
  });
});

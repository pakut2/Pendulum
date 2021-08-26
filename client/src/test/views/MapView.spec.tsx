import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
import MapView from "../../views/MapView";
import thunk from "redux-thunk";
import { Store } from "redux";
import configureMockStore from "redux-mock-store";
import { postEnum } from "../../store/enum/post.enum";
import { ztmEnum } from "../../store/enum/ztm.enum";

const routeComponentPropsMock = {
  history: {} as never,
  location: {} as never,
  match: { params: { id: "" } } as never,
};

const mockStore = configureMockStore([thunk]);

let storeMock: Store;

beforeEach(() => {
  storeMock = mockStore({
    postGetDetails: { post: { id: "1" } },
    getLocation: { line: { routeId: "1" } },
  });
});

describe("MapView", () => {
  it("should render component", async () => {
    render(
      <Provider store={storeMock}>
        <Router>
          <MapView {...routeComponentPropsMock} />
        </Router>
      </Provider>
    );
  });

  describe("on load", () => {
    it("should get post details", () => {
      storeMock = mockStore({
        postGetDetails: {},
        getLocation: {},
      });

      render(
        <Provider store={storeMock}>
          <Router>
            <MapView {...routeComponentPropsMock} />
          </Router>
        </Provider>
      );

      // @ts-ignore
      expect(storeMock.getActions()).toContainEqual({
        type: postEnum.POST_GET_DETAILS_REQUEST,
      });
    });

    it("should get location details", () => {
      storeMock = mockStore({
        postGetDetails: { post: { id: "1" } },
        getLocation: {},
      });

      render(
        <Provider store={storeMock}>
          <Router>
            <MapView {...routeComponentPropsMock} />
          </Router>
        </Provider>
      );

      // @ts-ignore
      expect(storeMock.getActions()).toContainEqual({
        type: ztmEnum.ZTM_GET_LOCATION_REQUEST,
      });
    });
  });
});

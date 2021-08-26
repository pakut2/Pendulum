import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "../App";
import store from "../store/store";

describe("App", () => {
  it("should render", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      div
    );
  });
});

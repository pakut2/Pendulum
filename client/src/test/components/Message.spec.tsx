import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
import Message from "../../components/Message";

const routeComponentPropsMock = {
  variant: "danger",
  children: [],
};

describe("Message", () => {
  it("should render component", async () => {
    render(
      <Provider store={store}>
        <Router>
          <Message {...routeComponentPropsMock} />
        </Router>
      </Provider>
    );
  });
});

import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
import Chat from "../../components/Chat";

const componentPropsMock = {
  id: "",
};

describe("Chat", () => {
  it("should render component", async () => {
    render(
      <Provider store={store}>
        <Router>
          <Chat {...componentPropsMock} />
        </Router>
      </Provider>
    );
  });
});

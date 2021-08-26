import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
import FormContainer from "../../components/FormContainer";

const componentPropsMock = {
  children: [],
  mdSize: 6,
};

describe("FormContainer", () => {
  it("should render component", async () => {
    render(
      <Provider store={store}>
        <Router>
          <FormContainer {...componentPropsMock} />
        </Router>
      </Provider>
    );
  });
});

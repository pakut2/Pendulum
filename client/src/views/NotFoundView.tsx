import React from "react";
import FormContainer from "../components/FormContainer";

const NotFoundView = () => {
  return (
    <FormContainer>
      <h1>
        <i className="fas fa-exclamation-triangle" /> Page Not Found
      </h1>
      <p>This page does not exist</p>
    </FormContainer>
  );
};

export default NotFoundView;

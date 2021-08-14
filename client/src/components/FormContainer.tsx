import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children, mdSize }: any) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={mdSize}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

FormContainer.defaultProps = {
  mdSize: 6,
};

export default FormContainer;

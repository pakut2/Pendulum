import React from "react";
import { Container, Row, Col } from "react-bootstrap";

interface Props {
  children: unknown;
  mdSize?: number;
}

const FormContainer: React.FC<Props> = ({ children, mdSize }) => {
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

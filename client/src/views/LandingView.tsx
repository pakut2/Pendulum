import React, { Fragment, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store/interface/RootState.interface";

const LandingView: React.FC = () => {
  const history = useHistory();

  const { userInfo } = useSelector((state: RootState) => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      history.push("/dashboard");
    }
  }, [userInfo, history]);

  return (
    <Fragment>
      <section className="background-img" />
      <Container>
        <Row className="justify-content-center align">
          <Col xs={12} md={6}>
            <Card border="primary" className="shadow text-center">
              <Card.Title>
                <h1>Pendulum</h1>
              </Card.Title>
              <Card.Subtitle className="text-muted">
                <h4>Experience public transportation at it's best</h4>
              </Card.Subtitle>
              <Card.Body>
                <Link className="btn btn-primary m-3" to="/dashboard">
                  Dashboard
                </Link>
                <Link className="btn btn-primary m-3" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary m-3" to="/register">
                  Register
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default LandingView;

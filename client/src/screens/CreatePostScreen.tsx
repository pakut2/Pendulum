import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listLines } from "../actions/ztmActions";
import { createPost } from "../actions/postActions";

const CreatePostScreen = ({ history }: any) => {
  const [lineNumber, setLineNumber] = useState("");
  const [direction, setDirection] = useState("");
  const [closestStop, setClosestStop] = useState("");
  const [vehicleCode, setVehicleCode] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const linesList = useSelector((state: any) => state.linesList);
  const { lines, loading, error } = linesList;

  const postCreate = useSelector((state: any) => state.postCreate);
  const { success, error: postCreateError } = postCreate;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (success) {
      history.push("/dashboard");
    }

    dispatch(listLines());
  }, [dispatch, history, userInfo, success]);

  const submitHandler = (e: any) => {
    e.preventDefault();

    if (vehicleCode !== "" && description !== "") {
      dispatch(
        createPost({
          line: lineNumber,
          direction,
          closestStop,
          vehicleCode,
          description,
        })
      );
    }

    if (vehicleCode === "") {
      dispatch(
        createPost({
          line: lineNumber,
          direction,
          closestStop,
          description,
        })
      );
    }

    if (description === "") {
      dispatch(
        createPost({
          line: lineNumber,
          direction,
          closestStop,
          vehicleCode,
        })
      );
    }

    if (vehicleCode === "" && description === "") {
      dispatch(
        createPost({
          line: lineNumber,
          direction,
          closestStop,
        })
      );
    }
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row className="justify-content-md-center py-3">
          <Col md={6}>
            <Link className="btn btn-outline-light my-3" to="/dashboard">
              Dashboard
            </Link>
            {postCreateError && <Message>{postCreateError}</Message>}
            <Form onSubmit={submitHandler}>
              <Row>
                <Col md={3}>
                  <Form.Group className="py-1" controlId="line">
                    <Form.Label>Line</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      onChange={(e) => {
                        setLineNumber(e.target.value);
                      }}
                    >
                      <option disabled selected>
                        Select Line
                      </option>
                      {lines.map((line: any) => (
                        <option
                          key={line.routeShortName}
                          value={line.routeShortName}
                        >
                          {line.routeShortName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={9}>
                  <Form.Group className="py-1" controlId="direction">
                    <Form.Label>Direction</Form.Label>
                    <Form.Control
                      as="select"
                      required
                      disabled={lineNumber === ""}
                      onChange={(e) => {
                        setDirection(e.target.value);
                      }}
                    >
                      <option disabled selected>
                        Select Direction
                      </option>
                      {lines.map(
                        (line: any) =>
                          line.routeShortName === lineNumber && (
                            <Fragment>
                              <option
                                key={line.routeLongName.split("-")[0]}
                                value={line.routeLongName.split("-")[0]}
                              >
                                {line.routeLongName.split("-")[0]}
                              </option>
                              <option
                                key={line.routeLongName.split("-")[1]}
                                value={line.routeLongName.split("-")[1]}
                              >
                                {line.routeLongName.split("-")[1]}
                              </option>
                            </Fragment>
                          )
                      )}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={3}>
                  <Form.Group className="py-1" controlId="code">
                    <Form.Label>Vehicle Code</Form.Label>
                    <Form.Control
                      type="code"
                      placeholder="Vehicle Code"
                      value={vehicleCode}
                      onChange={(e) => {
                        setVehicleCode(e.target.value);
                      }}
                    ></Form.Control>
                    <small className="form-text text-muted">Optional</small>
                  </Form.Group>
                </Col>
                <Col md={9}>
                  <Form.Group className="py-1" controlId="stop">
                    <Form.Label>Closest Stop</Form.Label>
                    <Form.Control
                      type="stop"
                      placeholder="Closest Stop Name"
                      value={closestStop}
                      required
                      onChange={(e) => {
                        setClosestStop(e.target.value);
                      }}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="text"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
                <small className="form-text text-muted">Optional</small>
              </Form.Group>
              <Button type="submit" variant="danger" className="my-3">
                <i className="fa fa-bullhorn"></i> Report
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CreatePostScreen;

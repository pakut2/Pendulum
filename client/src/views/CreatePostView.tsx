import React, { useEffect, useState, Fragment, SyntheticEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listLines } from "../api/ztm";
import { createPost } from "../api/post";
import { RootState } from "../store/interface/RootState.interface";
import { io } from "socket.io-client";

const CreatePostView = () => {
  const socket = io("/");

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [lines, setLines] = useState<Array<Object>>([]);
  const [linesError, setLinesError] = useState<null | string>(null);
  const [postCreateError, setPostCreateError] = useState<null | string>(null);
  const [successCreate, setSuccessCreate] = useState(false);
  const [lineNumber, setLineNumber] = useState("");
  const [direction, setDirection] = useState("");
  const [closestStop, setClosestStop] = useState("");
  const [vehicleCode, setVehicleCode] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);

  const { userInfo } = useSelector((state: RootState) => state.userLogin);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (successCreate) {
      history.push("/dashboard");
    }

    const getData = async () => {
      setLoading(true);
      try {
        const data = await listLines();
        setLines(data);
      } catch (err) {
        setLinesError(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
      }
      setLoading(false);
    };

    getData();
  }, [history, userInfo, successCreate]);

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createPost({
        line: lineNumber,
        direction,
        closestStop,
        vehicleCode,
        description,
      });

      socket.emit("post", lineNumber);
      setSuccessCreate(true);
    } catch (err) {
      setPostCreateError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
    setLoading(false);
  };

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : linesError ? (
        <Message>{linesError}</Message>
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
                    />
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
                    />
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
                />
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

export default CreatePostView;

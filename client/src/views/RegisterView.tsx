import React, { useState, useEffect, SyntheticEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../api/auth";
import { RootState } from "../store/interface/RootState.interface";
import { authEnum } from "../store/enum/auth.enum";

const RegisterView = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.userLogin);

  const {
    loading,
    error,
    userInfo: user,
  } = useSelector((state: RootState) => state.userRegister);

  useEffect(() => {
    if (userInfo) {
      history.push("/dashboard");
    }

    if (user) {
      history.push("/login");
    }
  }, [history, userInfo, user]);

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch({
        type: authEnum.AUTH_REGISTER_REQUEST,
      });
      try {
        const data = await register(name, email, password);
        dispatch({
          type: authEnum.AUTH_REGISTER_SUCCESS,
          payload: data,
        });

        localStorage.setItem("userRegister", JSON.stringify(data));
      } catch (err) {
        dispatch({
          type: authEnum.AUTH_REGISTER_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message>{message}</Message>}
      {error && <Message>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className="py-1" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="py-1" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="py-1" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="py-1" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            required
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="my-1">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Have an Account? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterView;

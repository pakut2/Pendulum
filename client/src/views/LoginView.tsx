import React, { useState, useEffect, SyntheticEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../api/auth";
import { resendConfirmationEmail } from "../api/mail";
import { RootState } from "../store/interface/RootState.interface";
import { authEnum } from "../store/enum/auth.enum";
import { mailEnum } from "../store/enum/mail.enum";

const LoginView = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector(
    (state: RootState) => state.userLogin
  );

  const { userInfo: user } = useSelector(
    (state: RootState) => state.userRegister
  );

  const {
    success,
    loading: loadingResend,
    error: errorResend,
  } = useSelector((state: RootState) => state.resendEmail);

  useEffect(() => {
    if (userInfo) {
      history.push("/dashboard");
    }
  }, [history, userInfo]);

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch({ type: authEnum.AUTH_LOGIN_REQUEST });
    try {
      const data = await login(email, password);
      dispatch({
        type: authEnum.AUTH_LOGIN_SUCCESS,
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: authEnum.AUTH_LOGIN_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

  const resendHandler = async (id: string) => {
    dispatch({
      type: mailEnum.MAIL_RESEND_REQUEST,
    });
    try {
      await resendConfirmationEmail(id);
      dispatch({
        type: mailEnum.MAIL_RESEND_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: mailEnum.MAIL_RESEND_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {loadingResend && <Loader />}
      {success && <Message variant="primary">Email has been sent</Message>}
      {error && <Message>{error}</Message>}
      {errorResend && <Message>{errorResend}</Message>}
      {user && (
        <Message variant="primary">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              resendHandler(user.id);
            }}
          >
            Confirmation Email sent to{" "}
            <strong style={{ textDecoration: "underline" }}>
              {user.email}
            </strong>
            . Click to resend email
          </span>
        </Message>
      )}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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
            placeholder="Enter password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="my-1">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New User? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginView;

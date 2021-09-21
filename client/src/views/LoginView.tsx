import React, { useState, useEffect, SyntheticEvent } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../api/auth";
import { resendConfirmationEmail, sendConfirmationToken } from "../api/mail";
import { RootState } from "../store/interface/RootState.interface";
import { authEnum } from "../store/enum/auth.enum";
import { mailEnum } from "../store/enum/mail.enum";

const LoginView: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const token = location.search && String(location.search.split("=")[1]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResendModal, setShowResendModal] = useState(false);

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

  const { success: emailConfirmationSuccess, error: emailConfirmationError } =
    useSelector((state: RootState) => state.emailConfirmation);

  useEffect(() => {
    if (token) {
      setShowConfirmModal(true);
    }

    if (userInfo) {
      history.push("/dashboard");
    }
  }, [history, userInfo, token]);

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
    } catch (err: any) {
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
    } catch (err: any) {
      dispatch({
        type: mailEnum.MAIL_RESEND_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

  const emailConfirmationHandler = async () => {
    dispatch({
      type: mailEnum.MAIL_CONFIRM_REQUEST,
    });
    try {
      await sendConfirmationToken(token);
      dispatch({
        type: mailEnum.MAIL_CONFIRM_SUCCESS,
      });

      setShowConfirmModal(false);

      dispatch({ type: authEnum.AUTH_REGISTER_RESET });
      localStorage.removeItem("userRegister");

      history.push("/login");
    } catch (err: any) {
      dispatch({
        type: mailEnum.MAIL_CONFIRM_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

  return (
    <FormContainer>
      <Modal
        show={showConfirmModal}
        onHide={() => {
          setShowConfirmModal(false);
        }}
        backdrop="static"
        keyboard={false}
        centered
        className="pb-5"
      >
        <Modal.Header>
          <Modal.Title>Welcome to Pendulum!</Modal.Title>
          <Button
            className="btn btn-close"
            data-dismiss="modal"
            onClick={() => {
              setShowConfirmModal(false);
            }}
          />
        </Modal.Header>
        <Modal.Body>
          {emailConfirmationError && (
            <Message>{emailConfirmationError}</Message>
          )}
          Click the button in order to finish registration
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-primary"
            onClick={() => {
              emailConfirmationHandler();
            }}
          >
            Confirm Email
          </Button>
        </Modal.Footer>
      </Modal>

      {user && (
        <Modal
          show={showResendModal}
          onHide={() => {
            setShowResendModal(false);
          }}
          backdrop="static"
          keyboard={false}
          centered
          className="pb-5"
        >
          <Modal.Header>
            <Modal.Title>Welcome to Pendulum!</Modal.Title>
            <Button
              className="btn btn-close"
              data-dismiss="modal"
              onClick={() => {
                setShowResendModal(false);
              }}
            />
          </Modal.Header>
          <Modal.Body>
            {loadingResend && <Loader />}
            {success && (
              <Message variant="primary">Email has been sent</Message>
            )}
            {errorResend && <Message>{errorResend}</Message>}
            Confirmation Email sent to{" "}
            <strong style={{ textDecoration: "underline" }}>
              {user.email}
            </strong>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-primary"
              data-testid="resend-email-btn"
              onClick={() => {
                resendHandler(user.id);
              }}
            >
              Resend Email
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <h1>Sign In</h1>
      {emailConfirmationSuccess && (
        <Message variant="success">Email Confirmed!</Message>
      )}
      {error && <Message>{error}</Message>}
      {user && (
        <Message variant="primary">
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowResendModal(true);
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
        <Button
          type="submit"
          variant="primary"
          className="my-1"
          data-testid="sign-in"
        >
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

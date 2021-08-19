import axios from "axios";
import React, { Fragment, SyntheticEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Button,
  Row,
  Col,
  Image,
  Container,
  Card,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAuthenticatedUser, updateUser } from "../api/user";
import { userEnum } from "../store/enum/user.enum";
import { RootState } from "../store/interface/RootState.interface";
import { authEnum } from "../store/enum/auth.enum";

const ProfileView = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>(
    undefined
  );
  const [message, setMessage] = useState<string | null>(null);
  const [displayInputs, toggleInputs] = useState(false);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, user } = useSelector(
    (state: RootState) => state.authenticatedUser
  );

  const { userInfo } = useSelector((state: RootState) => state.userLogin);

  const {
    error: userUpdateError,
    loading: userUpdateLoading,
    success,
  } = useSelector((state: RootState) => state.userUpdate);

  useEffect(() => {
    const getData = async () => {
      if (!userInfo) {
        history.push("/login");
      } else {
        if (!user || success) {
          dispatch({
            type: userEnum.USER_UPDATE_RESET,
          });

          dispatch({ type: userEnum.USER_GET_AUTH_REQUEST });

          try {
            const data = await getAuthenticatedUser();
            dispatch({ type: userEnum.USER_GET_AUTH_SUCCESS, payload: data });
          } catch (err) {
            dispatch({
              type: userEnum.USER_GET_AUTH_FAIL,
              payload:
                err.response && err.response.data.message
                  ? err.response.data.message
                  : err.message,
            });

            dispatch({ type: authEnum.AUTH_LOGOUT });
            localStorage.removeItem("userInfo");
          }
        } else {
          setName(user.name);
          setEmail(user.email);
          if (user.avatar) {
            setImage(user.avatar.url);
          } else {
            setImage(
              "http://www.gravatar.com/avatar/6a6c19fea4a3676970167ce51f39e6ee?s=200&r=pg&d=mm"
            );
          }
        }
      }
    };
    getData();
  }, [userInfo, history, user, dispatch, success]);

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch({ type: userEnum.USER_UPDATE_REQUEST });
      try {
        const data = await updateUser(userInfo.id, { name, email, password });

        dispatch({
          type: userEnum.USER_UPDATE_SUCCESS,
          payload: data,
        });

        dispatch({
          type: authEnum.AUTH_LOGIN_SUCCESS,
          payload: data,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (err) {
        dispatch({
          type: userEnum.USER_UPDATE_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      }
    }
  };

  const uploadHandler = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/users/upload",
        formData,
        config
      );

      setImage(data);
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  return (
    <Fragment>
      {error && <Message>{error}</Message>}
      {loading && <Loader />}
      <Container>
        <FormContainer>
          <Link className="btn btn-outline-light my-3" to="/dashboard">
            Dashboard
          </Link>
          <Card border="secondary">
            <Card.Header className="text-center">
              <Image
                src={image}
                width="120"
                height="120"
                roundedCircle
                className="mx-auto"
              />
            </Card.Header>
            <Card.Body className="text-center">
              <Card.Title>{name}</Card.Title>
              <Card.Text>
                <i className="fa fa-envelope-o"></i> {email}
              </Card.Text>
            </Card.Body>
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                toggleInputs(!displayInputs);
              }}
            >
              Edit Profile
            </Button>
          </Card>
        </FormContainer>
      </Container>

      {displayInputs && (
        <Row className="justify-content-md-center py-3">
          <Col md={3}>
            {userUpdateError && <Message>{userUpdateError}</Message>}
            {userUpdateLoading && <Loader />}
            {message && <Message>{message}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group className="py-1" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
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
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="py-1" controlId="image">
                <Form.Label>Avatar</Form.Label>
                <Form.File
                  id="image-file"
                  custom
                  onChange={uploadHandler}
                ></Form.File>
                {uploading && <Loader />}
              </Form.Group>
              <Button type="submit" variant="primary" className="my-1">
                Update
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default ProfileView;

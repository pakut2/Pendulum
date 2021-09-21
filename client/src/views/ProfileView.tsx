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
import { fileEnum } from "../store/enum/file.enum";
import { getSignedUrl, updateAvatar } from "../api/file";

const ProfileView: React.FC = () => {
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
  const [fileError, setFileError] = useState(false);

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

  const { error: getSignedUrlError } = useSelector(
    (state: RootState) => state.fileSignedUrl
  );

  const { error: s3PostError } = useSelector(
    (state: RootState) => state.fileS3Post
  );

  const { success: avatarUpdateSuccess, error: avatarUpdateError } =
    useSelector((state: RootState) => state.fileAvatarUpdate);

  useEffect(() => {
    const getData = async () => {
      if (!userInfo) {
        history.push("/login");
      } else {
        if (!user || success || avatarUpdateSuccess) {
          dispatch({
            type: userEnum.USER_UPDATE_RESET,
          });

          dispatch({ type: fileEnum.FILE_AVATAR_UPDATE_RESET });

          dispatch({ type: userEnum.USER_GET_AUTH_REQUEST });

          try {
            const data = await getAuthenticatedUser();
            dispatch({ type: userEnum.USER_GET_AUTH_SUCCESS, payload: data });
          } catch (err: any) {
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
            setImage(`https://robohash.org/${user.id}`);
          }
        }
      }
    };
    getData();
  }, [userInfo, history, user, dispatch, success, avatarUpdateSuccess]);

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
      } catch (err: any) {
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

  const uploadHandler = async (e: SyntheticEvent | any) => {
    await submitHandler(e);

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const maxFileSize = 10485760;

    if (
      file.size <= maxFileSize &&
      (file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg")
    ) {
      setUploading(true);
      try {
        const url = await getSignedUrl(file.name);
        dispatch({ type: fileEnum.FILE_URL_SUCCESS, payload: url.data });

        try {
          const config = {
            headers: {
              "Content-Type": "application/x-binary",
            },
          };

          await axios.put(url.data.presignedURL, file, config);
          dispatch({ type: fileEnum.FILE_POST_SUCCESS });

          try {
            const user = await updateAvatar(url.data.key);
            dispatch({
              type: fileEnum.FILE_AVATAR_UPDATE_SUCCESS,
              payload: user.data,
            });

            dispatch({
              type: authEnum.AUTH_LOGIN_SUCCESS,
              payload: user.data,
            });

            localStorage.setItem("userInfo", JSON.stringify(user.data));
          } catch (err: any) {
            dispatch({
              type: fileEnum.FILE_AVATAR_UPDATE_FAIL,
              payload:
                err.response && err.response.data.message
                  ? err.response.data.message
                  : err.message,
            });
          }
        } catch (err: any) {
          dispatch({
            type: fileEnum.FILE_POST_FAIL,
            payload:
              err.response && err.response.data.message
                ? err.response.data.message
                : err.message,
          });
        }
      } catch (err: any) {
        dispatch({
          type: fileEnum.FILE_URL_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      }
      setUploading(false);
    } else {
      setFileError(true);
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
            {getSignedUrlError && <Message>{getSignedUrlError}</Message>}
            {s3PostError && <Message>{s3PostError}</Message>}
            {avatarUpdateError && <Message>{avatarUpdateError}</Message>}
            {fileError && (
              <Message>
                File name must end with .png, .jpg or .jpeg, and be below 10mb
              </Message>
            )}
            {userUpdateLoading && <Loader />}
            {uploading && <Loader />}
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
              <Form.Group className="py-1" controlId="image-file">
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  className="form-control"
                  type="file"
                  onChange={uploadHandler}
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="my-2">
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

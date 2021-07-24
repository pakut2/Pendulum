import React, { Fragment, useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getAuthenticatedUser } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const ProfileScreen = ({ history }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [displayInputs, toggleInputs] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const authenticatedUser = useSelector(
    (state: any) => state.authenticatedUser
  );
  const { loading, error, user } = authenticatedUser;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (!user) {
      dispatch(getAuthenticatedUser());
    } else {
      setName(user.name);
      setEmail(user.email);

      setImage(user.image);
    }
  }, [userInfo, dispatch, history, getAuthenticatedUser, user]);

  return (
    <Fragment>
      {error && <Message>{error}</Message>}
      {loading && <Loader />}
      <Container>
        <Row className="justify-content-md-center">
          <Col xs={12} md={6}>
            <Card border="primary">
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
          </Col>
        </Row>
      </Container>
      {displayInputs && <FormContainer>asd</FormContainer>}
    </Fragment>
  );
};

export default ProfileScreen;

import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { adminUpdateUser, getUserDetails } from "../actions/userActions";
import { USER_ADMIN_UPDATE_RESET } from "../constants/userConstants";

const UserEditScreen = ({ match, history }: any) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(false);

  const dispatch = useDispatch();

  const userGetDetails = useSelector((state: any) => state.userGetDetails);
  const { loading, error, user } = userGetDetails;

  const userAdminUpdate = useSelector((state: any) => state.userAdminUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success,
  } = userAdminUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_ADMIN_UPDATE_RESET });
      history.push("/admin/userList");
    } else {
      if (!user || user.id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        if (user.role === "admin") {
          setRole(true);
        } else {
          setRole(false);
        }
      }
    }
  }, [user, userId, dispatch, history, success]);

  const submitHandler = (e: any) => {
    e.preventDefault();

    if (role) {
      dispatch(adminUpdateUser(userId, { name, email, role: "admin" }));
    } else {
      dispatch(adminUpdateUser(userId, { name, email, role: "user" }));
    }
  };

  return (
    <Fragment>
      <FormContainer>
        <Link to="/admin/userlist" className="btn btn-outline-light my-3">
          Go Back
        </Link>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
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
              ></Form.Control>
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
              ></Form.Control>
            </Form.Group>
            <Form.Group className="py-1" controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={role}
                onChange={(e) => {
                  setRole(e.target.checked);
                }}
              ></Form.Check>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default UserEditScreen;

import React, { Fragment, useState, useEffect, SyntheticEvent } from "react";
import { Link, useHistory, RouteComponentProps } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { adminUpdateUser, getUserDetails } from "../api/user";
import { userEnum } from "../store/enum/user.enum";
import { RootState } from "../store/interface/RootState.interface";

interface MatchParams {
  id: string;
}

const UserEditView: React.FC<RouteComponentProps<MatchParams>> = ({
  match,
}) => {
  const userId = match.params.id;

  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(false);

  const dispatch = useDispatch();

  const { loading, error, user } = useSelector(
    (state: RootState) => state.userGetDetails
  );

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success,
  } = useSelector((state: RootState) => state.userAdminUpdate);

  useEffect(() => {
    const getData = async () => {
      if (success) {
        dispatch({ type: userEnum.USER_ADMIN_UPDATE_RESET });
        history.push("/admin/userlist");
      } else {
        if (!user || user.id !== userId) {
          dispatch({ type: userEnum.USER_DETAILS_REQUEST });
          try {
            const data = await getUserDetails(userId);
            dispatch({
              type: userEnum.USER_DETAILS_SUCCESS,
              payload: data,
            });
          } catch (err: any) {
            dispatch({
              type: userEnum.USER_DETAILS_FAIL,
              payload:
                err.response && err.response.data.message
                  ? err.response.data.message
                  : err.message,
            });
          }
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
    };
    getData();
  }, [user, userId, dispatch, history, success]);

  const submitHandler = (e: SyntheticEvent) => {
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
            <Form.Group className="py-1" controlId="isAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={role}
                onChange={(e) => {
                  setRole(e.target.checked);
                }}
              />
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

export default UserEditView;

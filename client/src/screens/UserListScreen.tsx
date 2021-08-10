import React, { Fragment, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers, deleteUser } from "../actions/userActions";
import { USER_DETAILS_RESET } from "../constants/userConstants";

const UserListScreen = ({ history }: any) => {
  const dispatch = useDispatch();

  const userList = useSelector((state: any) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state: any) => state.userDelete);
  const { success: successDelete } = userDelete;

  const userGetDetails = useSelector((state: any) => state.userGetDetails);
  const { user } = userGetDetails;

  useEffect(() => {
    if (userInfo && userInfo.role === "admin") {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }

    if (user) {
      dispatch({ type: USER_DETAILS_RESET });
    }
  }, [dispatch, history, userInfo, successDelete, user]);

  const deleteHandler = (id: string) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <Fragment>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table bordered hover responsive className="table-sm table-secondary">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.role === "admin" ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>
                <td className="text-center">
                  <LinkContainer to={`/admin/user/${user.id}/edit`}>
                    <Button variant="light" className="btn-sm ">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm "
                    onClick={() => {
                      deleteHandler(user.id);
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Fragment>
  );
};

export default UserListScreen;

import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers, deleteUser } from "../api/user";
import { userEnum } from "../store/enum/user.enum";
import { RootState } from "../store/interface/RootState.interface";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isEmailConfirmed: boolean;
}

const UserListView: React.FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { loading, error, users } = useSelector(
    (state: RootState) => state.userList
  );

  const { userInfo } = useSelector((state: RootState) => state.userLogin);

  const { success: successDelete } = useSelector(
    (state: RootState) => state.userDelete
  );

  const { user } = useSelector((state: RootState) => state.userGetDetails);

  useEffect(() => {
    const getData = async () => {
      if (userInfo && userInfo.role === "admin") {
        dispatch({ type: userEnum.USER_LIST_REQUEST });
        try {
          const data = await listUsers();
          dispatch({
            type: userEnum.USER_LIST_SUCCESS,
            payload: data,
          });
        } catch (err) {
          dispatch({
            type: userEnum.USER_LIST_FAIL,
            payload:
              err.response && err.response.data.message
                ? err.response.data.message
                : err.message,
          });
        }
      } else {
        history.push("/login");
      }

      if (user) {
        dispatch({ type: userEnum.USER_DETAILS_RESET });
      }
    };
    getData();
  }, [dispatch, history, userInfo, successDelete, user]);

  const deleteHandler = async (id: string) => {
    if (window.confirm("Are you sure?")) {
      dispatch({ type: userEnum.USER_DELETE_REQUEST });
      try {
        await deleteUser(id);
        dispatch({
          type: userEnum.USER_DELETE_SUCCESS,
        });
      } catch (err) {
        dispatch({
          type: userEnum.USER_DELETE_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      }
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
            {users.map((user: User | any) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  {user.isEmailConfirmed ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}{" "}
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
                    className="btn-sm"
                    data-testid="delete-btn"
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

export default UserListView;

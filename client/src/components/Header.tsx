import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown, Image } from "react-bootstrap";
import { logout } from "../api/auth";
import { RootState } from "../store/interface/RootState.interface";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <i className="fa fa-bus"></i> Pendulum
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end" style={{ width: "100%" }}>
              {userInfo ? (
                <Fragment>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Navbar.Brand>
                    <Image
                      src={
                        userInfo.avatar
                          ? userInfo.avatar.url
                          : `https://robohash.org/${userInfo.id}`
                      }
                      alt=""
                      width="25"
                      height="25"
                      roundedCircle
                      className="d-none d-sm-block mt-1"
                    />
                  </Navbar.Brand>
                </Fragment>
              ) : (
                <Fragment>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <i className="fa fa-user-plus"></i> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </Fragment>
              )}
              {userInfo && userInfo.role === "admin" && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

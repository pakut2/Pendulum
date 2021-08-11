import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { listPosts } from "../api/post";
import { postEnum } from "../store/enum/post.enum";
import { authEnum } from "../store/enum/auth.enum";
import { RootState } from "../store/interface/RootState.interface";

const DashboardView = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.userLogin);

  const { userInfo: registerUser } = useSelector(
    (state: RootState) => state.userRegister
  );

  const { posts, loading, error } = useSelector(
    (state: RootState) => state.postList
  );

  const { success } = useSelector((state: RootState) => state.postCreate);

  const { success: successDelete, error: errorDelete } = useSelector(
    (state: RootState) => state.postDelete
  );

  useEffect(() => {
    dispatch(listPosts());

    if (success) {
      dispatch({ type: postEnum.POST_CREATE_RESET });
    }

    if (registerUser) {
      dispatch({ type: authEnum.AUTH_REGISTER_RESET });
    }
  }, [dispatch, success, successDelete, registerUser]);

  return (
    <Container>
      {userInfo ? (
        <Row className="justify-content-md-center text-center">
          <Col md={6}>
            <Link className="btn btn-danger" to="/post">
              <i className="fa fa-bullhorn"></i> Report
            </Link>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-md-center text-center">
          <Col md={6}>
            <Message variant="secondary">
              Please <Link to="/login">Sign In</Link> to Report
            </Message>
          </Col>
        </Row>
      )}

      {errorDelete && <Message>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Row className="justify-content-md-center">
          <Col xs={12} md={8}>
            {posts.map((post: any) => (
              <Card key={post.id} className="my-3" border="secondary">
                <Post post={post} />
              </Card>
            ))}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default DashboardView;

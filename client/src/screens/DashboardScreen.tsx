import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Post from "../components/Post";
import { listPosts } from "../actions/postActions";
import { POST_CREATE_RESET } from "../constants/postConstants";

const DashboardScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const postList = useSelector((state: any) => state.postList);
  const { posts, loading, error } = postList;

  const postCreate = useSelector((state: any) => state.postCreate);
  const { success } = postCreate;

  const postDelete = useSelector((state: any) => state.postDelete);
  const { success: successDelete, error: errorDelete } = postDelete;

  useEffect(() => {
    dispatch(listPosts());

    if (success) {
      dispatch({ type: POST_CREATE_RESET });
    }
  }, [dispatch, success, successDelete]);

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

export default DashboardScreen;

import React, { useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import Post from "../components/Post";
import { listPosts } from "../api/post";
import { postEnum } from "../store/enum/post.enum";
import { authEnum } from "../store/enum/auth.enum";
import { RootState } from "../store/interface/RootState.interface";
import { ztmEnum } from "../store/enum/ztm.enum";

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

  const { success: successLike, error: errorLike } = useSelector(
    (state: RootState) => state.postLike
  );

  const { post } = useSelector((state: RootState) => state.postGetDetails);

  const { line } = useSelector((state: RootState) => state.getLocation);

  useEffect(() => {
    dispatch(listPosts());

    if (success) {
      dispatch({ type: postEnum.POST_CREATE_RESET });
    }
    if (registerUser) {
      dispatch({ type: authEnum.AUTH_REGISTER_RESET });
    }
    if (post) {
      dispatch({ type: postEnum.POST_GET_DETAILS_RESET });
    }
    if (line) {
      dispatch({ type: ztmEnum.ZTM_GET_LOCATION_RESET });
    }
  }, [dispatch, success, successDelete, registerUser, successLike, line, post]);

  return (
    <Fragment>
      {userInfo ? (
        <Row className="justify-content-md-center text-center">
          <Col md={6}>
            <Link className="btn btn-danger mb-3" to="/post">
              <i className="fa fa-bullhorn"></i> Report
            </Link>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-md-center text-center">
          <Col md={6}>
            <Message variant="secondary mb-3">
              Please <Link to="/login">Sign In</Link> to Report
            </Message>
          </Col>
        </Row>
      )}
      <FormContainer mdSize={8}>
        {errorDelete && <Message>{errorDelete}</Message>}
        {errorLike && <Message>{errorLike}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Fragment>
            {posts.map((post: any) => (
              <Card key={post.id} className="my-3" border="secondary">
                <Post post={post} />
              </Card>
            ))}
          </Fragment>
        )}
      </FormContainer>
    </Fragment>
  );
};

export default DashboardView;

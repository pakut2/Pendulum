import React, { useEffect, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import Post from "../components/Post";
import Chat from "../components/Chat";
import { listPosts } from "../api/post";
import { postEnum } from "../store/enum/post.enum";
import { authEnum } from "../store/enum/auth.enum";
import { RootState } from "../store/interface/RootState.interface";
import { ztmEnum } from "../store/enum/ztm.enum";
import { io } from "socket.io-client";
import { mailEnum } from "../store/enum/mail.enum";

interface Post {
  id: string;
  line: string;
  direction: string;
  closestStop: string;
  vehicleCode?: string;
  description?: string;
  likes: Array<string>;
  createdAt: string;
  author: {
    id: string;
    email: string;
    name: string;
    role: string;
    isEmailConfirmed: boolean;
    avatar?: {
      id: string;
      url: string;
      key: string;
    };
  };
}

const DashboardView: React.FC = () => {
  const [newPost, setNewPost] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.userLogin);

  const { userInfo: registerUser } = useSelector(
    (state: RootState) => state.userRegister
  );

  const { posts, loading, error } = useSelector(
    (state: RootState) => state.postList
  );

  const { success, post: createdPost } = useSelector(
    (state: RootState) => state.postCreate
  );

  const { success: successDelete, error: errorDelete } = useSelector(
    (state: RootState) => state.postDelete
  );

  const { success: successLike, error: errorLike } = useSelector(
    (state: RootState) => state.postLike
  );

  const { post } = useSelector((state: RootState) => state.postGetDetails);

  const { line } = useSelector((state: RootState) => state.getLocation);

  const { success: successResend } = useSelector(
    (state: RootState) => state.resendEmail
  );

  const { posts: postsFromSocket } = useSelector(
    (state: RootState) => state.postsFromSocket
  );

  const { success: emailConfirmationSuccess } = useSelector(
    (state: RootState) => state.emailConfirmation
  );

  const socket = io("/");

  useEffect(() => {
    socket.on("post", (post: Post) => {
      if (post && (!userInfo || post.author.id !== userInfo.id)) {
        postsFromSocket.push(post);
        dispatch({
          type: postEnum.POST_FROM_SOCKET_NEW,
          payload: postsFromSocket,
        });
        setNewPost(true);
      }
    });

    const getData = async () => {
      dispatch({ type: postEnum.POST_LIST_REQUEST });
      try {
        const data = await listPosts();
        dispatch({ type: postEnum.POST_LIST_SUCCESS, payload: data });
      } catch (err) {
        dispatch({
          type: postEnum.POST_LIST_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      }
    };
    getData();

    if (success) {
      socket.emit("post", createdPost);
      dispatch({ type: postEnum.POST_CREATE_RESET });
    }
    if (userInfo && registerUser) {
      dispatch({ type: authEnum.AUTH_REGISTER_RESET });
    }
    if (post) {
      dispatch({ type: postEnum.POST_GET_DETAILS_RESET });
    }
    if (line) {
      dispatch({ type: ztmEnum.ZTM_GET_LOCATION_RESET });
    }
    if (successResend) {
      dispatch({ type: mailEnum.MAIL_RESEND_RESET });
    }
    if (emailConfirmationSuccess) {
      dispatch({ type: mailEnum.MAIL_CONFIRM_RESET });
    }
  }, [
    dispatch,
    success,
    successDelete,
    registerUser,
    successLike,
    line,
    successResend,
    post,
    userInfo,
    emailConfirmationSuccess,
  ]);

  return (
    <Fragment>
      <Row className="justify-content-md-center text-center">
        <Col md={6}>
          {userInfo ? (
            <Link className="btn btn-danger mb-3" to="/post">
              <i className="fa fa-bullhorn"></i> Report
            </Link>
          ) : (
            <Message variant="secondary mb-3">
              Please <Link to="/login">Sign In</Link> to Report
            </Message>
          )}
          {posts.length === 0 && !loading && (
            <Message variant="primary">No Reports at the moment</Message>
          )}
        </Col>
      </Row>
      <FormContainer mdSize={8}>
        {errorDelete && <Message>{errorDelete}</Message>}
        {errorLike && <Message>{errorLike}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Fragment>
            {posts.map((post: Post | any) => (
              <Card key={post.id} className="my-3" border="secondary">
                <Post post={post} />
              </Card>
            ))}

            {newPost &&
              postsFromSocket.map((post: Post | any) => (
                <Card key={post.id} className="my-3" border="secondary">
                  <Post post={post} />
                </Card>
              ))}
          </Fragment>
        )}
      </FormContainer>
      {userInfo && <Chat id={userInfo.id} />}
    </Fragment>
  );
};

export default DashboardView;

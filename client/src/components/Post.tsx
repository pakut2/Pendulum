import React, { Fragment } from "react";
import { Card, Image, ListGroup, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deletePost } from "../actions/postActions";

const Post = ({ post }: any) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteHandler = (id: string) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePost(id));
    }
  };

  return (
    <Fragment>
      <Card.Header>
        <Row>
          <Col>
            <Image
              src={
                post.author.avatar
                  ? post.author.avatar.url
                  : "http://www.gravatar.com/avatar/6a6c19fea4a3676970167ce51f39e6ee?s=200&r=pg&d=mm"
              }
              alt=""
              width="30"
              height="30"
              roundedCircle
            />{" "}
            {post.author.name}
          </Col>
          <Col xs={2} sm={1}>
            {userInfo && userInfo.id === post.author.id && (
              <Button
                className="btn btn-danger"
                onClick={() => {
                  deleteHandler(post.id);
                }}
              >
                <i className="fa fa-times-circle-o"></i>
              </Button>
            )}

            {userInfo &&
              userInfo.role === "admin" &&
              userInfo.id !== post.author.id && (
                <Button
                  className="btn btn-danger"
                  onClick={() => {
                    deleteHandler(post.id);
                  }}
                >
                  <i className="fa fa-times-circle-o"></i>
                </Button>
              )}
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Line: {post.line}</ListGroup.Item>
          <ListGroup.Item>Direction: {post.direction}</ListGroup.Item>
          <ListGroup.Item>Closest Stop: {post.closestStop}</ListGroup.Item>
          {post.vehicleCode && (
            <ListGroup.Item>Vehicle Code: {post.vehicleCode}</ListGroup.Item>
          )}
          {post.description && (
            <ListGroup.Item>Description: {post.description}</ListGroup.Item>
          )}
        </ListGroup>
        <Card.Text className="btn btn-secondary mx-3">
          <i className="fa fa-chevron-up"></i> {post.likes}
        </Card.Text>
      </Card.Body>
    </Fragment>
  );
};

export default Post;

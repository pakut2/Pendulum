import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Card, Image, ListGroup, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../api/post";
import { RootState } from "../store/interface/RootState.interface";
import { DateTime } from "luxon";

const Post = ({ post }: any) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: RootState) => state.userLogin);

  const formattedTime = DateTime.fromISO(post.createdAt);
  const diff = DateTime.now().diff(formattedTime, ["hours", "minutes"]);

  const deleteHandler = (id: string) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePost(id));
    }
  };

  const likeHandler = (id: string) => {
    dispatch(likePost(id));
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

          {post.vehicleCode && (
            <Col xs={2} sm={1}>
              <Link className="btn btn-primary" to={`map/${post.id}`}>
                <i className="fa fa-map-marker"></i>
              </Link>
            </Col>
          )}

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
        <Row className="pt-3">
          <Col>
            {userInfo ? (
              <Card.Text
                className="btn btn-secondary mx-3"
                onClick={() => {
                  likeHandler(post.id);
                }}
              >
                <i className="fa fa-chevron-up"></i> {post.likes.length}
              </Card.Text>
            ) : (
              <Link className="btn btn-secondary mx-3" to="/login">
                <i className="fa fa-chevron-up"></i> {post.likes.length}
              </Link>
            )}
          </Col>
          <Col xs={4} sm={2}>
            {Math.round(diff.minutes)} min. ago
          </Col>
        </Row>
      </Card.Body>
    </Fragment>
  );
};

export default Post;

import React from "react";
import { Alert } from "react-bootstrap";

interface PropTypes {
  variant: string;
  children: string | null;
}

const Message = ({ variant, children }: PropTypes) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "danger",
};

export default Message;

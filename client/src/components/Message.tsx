import React from "react";
import { Alert } from "react-bootstrap";

interface PropTypes {
  variant?: string;
  children: string | null | any;
}

const Message: React.FC<PropTypes> = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "danger",
};

export default Message;

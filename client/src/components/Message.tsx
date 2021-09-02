import React from "react";
import { Alert } from "react-bootstrap";

interface Props {
  variant?: string;
  children: string | null | any;
}

const Message: React.FC<Props> = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "danger",
};

export default Message;

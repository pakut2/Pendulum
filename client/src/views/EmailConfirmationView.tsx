import React, { useEffect } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { RootState } from "../store/interface/RootState.interface";
import { sendConfirmationToken } from "../api/mail";
import { mailEnum } from "../store/enum/mail.enum";

interface MatchParams {
  token: string;
}

const EmailConfirmationView = ({ match }: RouteComponentProps<MatchParams>) => {
  const token = match.params.token;

  const history = useHistory();
  const dispatch = useDispatch();

  const { success, error } = useSelector(
    (state: RootState) => state.emailConfirmation
  );

  useEffect(() => {
    if (success) {
      history.push("/login");
    }
  }, [history, success]);

  const clickHandler = async () => {
    dispatch({
      type: mailEnum.MAIL_CONFIRM_REQUEST,
    });
    try {
      await sendConfirmationToken(token);
      dispatch({
        type: mailEnum.MAIL_CONFIRM_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: mailEnum.MAIL_CONFIRM_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

  return (
    <FormContainer>
      {error && <Message>{error}</Message>}
      <h1>Welcome to Pendulum</h1>
      <Button
        className="btn btn-primary"
        onClick={() => {
          clickHandler();
        }}
      >
        Confirm Email Address
      </Button>
    </FormContainer>
  );
};

export default EmailConfirmationView;
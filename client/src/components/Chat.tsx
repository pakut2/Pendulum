import React from "react";
import { ReactSlackChat } from "react-slack-chat";

interface PropTypes {
  id: string;
}

const Chat = ({ id }: PropTypes) => {
  return (
    <div style={{ all: "initial" }}>
      <ReactSlackChat
        botName={id}
        channels={[
          {
            name: "pendulum-chat",
            id: "C02BMTED2AJ",
          },
        ]}
        apiToken={process.env.REACT_APP_SLACK_BOT_TOKEN}
        helpText="Chat"
        singleUserMode={false}
        defaultMessage="Welcome to Pendulum!"
        themeColor="#375a7f"
        userImage={`https://robohash.org/${id}`}
      />
    </div>
  );
};

export default Chat;
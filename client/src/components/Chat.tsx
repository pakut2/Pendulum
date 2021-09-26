import React from "react";
import { ReactSlackChat } from "react-slack-chat";

interface Props {
  id: string;
}

const Chat: React.FC<Props> = ({ id }) => {
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
        apiToken="eG94Yi0yNDA4Nzg1MDIyMzU2LTIzOTU4OTI3NDQ3OTAtZ0kxNUk0RDFKYmc3MkkwbVcxbEhNUmYz"
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

import React from "react";

const Chat = ({ type, msg }) => {
  return (
    <>
      <div className={`msg-${type}`}>{msg}</div>
      <br />
    </>
  );
};

export default Chat;

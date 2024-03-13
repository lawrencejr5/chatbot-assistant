import React from "react";
// import { BsFillChatRightFill } from "react-icons/bs";
import { useGlobalContext } from "../context";

const ChatIcon = () => {
  const { setChatbotModal } = useGlobalContext();
  return (
    <button
      className="chatIcon"
      onClick={() => {
        setChatbotModal(true);
      }}
    >
      {/* <BsFillChatRightFill className="icon" /> */}
    </button>
  );
};

export default ChatIcon;

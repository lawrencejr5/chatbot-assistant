import React from "react";

import Chat from "./Chat";

// import { GiArtificialIntelligence } from "react-icons/gi";
import { useGlobalContext } from "../context";

const ChatBot = () => {
  const { value, setValue, chatbotModal, chats, userChat, loading } =
    useGlobalContext();

  return (
    <aside
      className={
        !chatbotModal ? "hidden chatbot-container" : "chatbot-container"
      }
    >
      <div className="chatbot">
        <div className="header">
          {/* <GiArtificialIntelligence className="icon" /> */}
          <span>Lawjun</span>
        </div>
        <div className="chat-body">
          {chats.map((chat, index) => {
            const { type, msg } = chat;
            return <Chat key={index} type={type} msg={msg} />;
          })}
          {loading && <Chat type={"bot"} msg={"Typing..."} />}
        </div>
        <div className="msg-container">
          <form id="msgForm" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="msg"
              id="msg"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <button type="button" id="msgBtn" onClick={userChat}>
              Send
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
};
export default ChatBot;

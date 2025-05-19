import React from "react";

import Chat from "./Chat";

// import { GiArtificialIntelligence } from "react-icons/gi";
import { useGlobalContext } from "../context";

const ChatBot = () => {
  return (
    <aside className={"hidden chatbot-container"}>
      <div className="chatbot">
        <div className="header">
          {/* <GiArtificialIntelligence className="icon" /> */}
          <span>Lawjun Assistant</span>
        </div>
        <div className="chat-body"></div>
        <div className="msg-container">
          <form id="msgForm">
            <input type="text" name="msg" id="msg" value={""} />
            <button type="button" id="msgBtn">
              Send
            </button>
          </form>
        </div>
      </div>
    </aside>
  );
};
export default ChatBot;

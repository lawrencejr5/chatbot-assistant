import React from "react";

import Chat from "./Chat";

import { GiArtificialIntelligence } from "react-icons/gi";

const ChatBot = () => {
  return (
    <aside className="chatbot-container">
      <div className="chatbot">
        <div className="header">
          <GiArtificialIntelligence className="icon" />
          <span>Lawjun</span>
        </div>
        <hr />
        <div className="chat-body">
          <Chat
            type="bot"
            msg="Hi, My name na Lawjun and I go be ur career assistant for today"
          />
          <Chat type="bot" msg="Wetin u go like make I dey call u?" />
          <Chat type="user" msg="Call me Lawrence" />
          <Chat type="bot" msg="Ok, no wahala Lawrence" />
          <Chat type="bot" msg="So which stage u dey for ur life so?" />
          <Chat type="user" msg="At this point, I no even know" />
        </div>
        <form id="msgForm">
          <input
            type="text"
            name="msg"
            id="msg"
            // ref={msgRef}
            onClick={(e) => {}}
          />
          <button>Send</button>
        </form>
      </div>
    </aside>
  );
};
export default ChatBot;

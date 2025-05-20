import React, { useEffect } from "react";

import axios from "axios";

import { IoSend } from "react-icons/io5";

import Typewriter from "./components/Typewriter";

const App = () => {
  const [input, setInput] = React.useState("");

  const [chats, setChats] = React.useState([]);

  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    console.log(chats);
  }, [chats]);

  const send = async (e) => {
    e.preventDefault();
    try {
      setInput("");

      const newMessage = { role: "user", parts: [{ text: input }] };

      setChats((prev) => {
        return [...prev, newMessage];
      });
      setLoading(true);

      const { data } = await axios.post("http://localhost:5000/api/v1", {
        chatHistory: [...chats, newMessage],
      });

      const modelReply = { role: "model", parts: [{ text: data.response }] };
      setChats((prev) => {
        return [...prev, modelReply];
      });

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1>Lawjun @Gemini</h1>

      <section className="chat-section">
        {chats.map((chat, i) => {
          return chat.parts[0].text ? (
            <div className={`chat ${chat.role === "model" && "ai"}`} key={i}>
              <Typewriter text={chat.parts[0].text} speed={1} />
            </div>
          ) : (
            <div></div>
          );
        })}
        {loading && <div className="chat ai">typing...</div>}
      </section>

      <section className="form-section">
        <form action="" onSubmit={send}>
          <h2>Chat with lawjun</h2>
          <div className="inp-holder">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Lawjun..."
            />
            <button>
              <IoSend />
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};
export default App;

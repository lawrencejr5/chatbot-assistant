import React, { useEffect } from "react";

import axios from "axios";

import { IoSend } from "react-icons/io5";

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
      setChats((prev) => {
        return [...prev, { type: "usr", msg: input }];
      });
      setLoading(true);

      const { data } = await axios.post("http://localhost:5000/api/v1", {
        input,
      });

      setChats((prev) => {
        return [...prev, { type: "ai", msg: data.response }];
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
          return chat.msg ? (
            <div className={`chat ${chat.type === "ai" && "ai"}`} key={i}>
              {chat.msg}
            </div>
          ) : loading ? (
            <div className="chat ai">typing...</div>
          ) : (
            <div></div>
          );
        })}
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

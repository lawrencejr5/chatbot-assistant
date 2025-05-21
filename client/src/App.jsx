import React, { useEffect, useRef } from "react";

import axios from "axios";

import { IoSend } from "react-icons/io5";

import Typewriter from "./components/Typewriter";

const App = () => {
  const [input, setInput] = React.useState("");

  const allChats = localStorage.getItem("chats")
    ? JSON.parse(localStorage.getItem("chats"))
    : [];
  const [chats, setChats] = React.useState([...allChats]);

  const [loading, setLoading] = React.useState(false);

  // Scrolling ref
  const divRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
    setTimeout(() => {
      divRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // adjust delay as needed
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

      const { data } = await axios.post(
        "https://lawjun-assistant-api.vercel.app/api/v1",
        {
          chatHistory: [...chats, newMessage],
        }
      );

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
      <h1>Lawjun Assistant</h1>

      {chats.length == 0 ? (
        <section className="empty-section">
          <h1>How far?😎</h1>
        </section>
      ) : (
        <section className="chat-section">
          {chats.map((chat, i) => {
            return chat.parts[0].text ? (
              <div className={`chat ${chat.role === "model" && "ai"}`} key={i}>
                {chat.role === "model" ? (
                  <Typewriter
                    text={chat.parts[0].text}
                    speed={1}
                    shouldAnimate={chat == chats[chats.length - 1]}
                  />
                ) : (
                  chat.parts[0].text
                )}
              </div>
            ) : (
              <div></div>
            );
          })}
          <div ref={divRef} />
          {loading && <div className="chat ai">typing...</div>}
        </section>
      )}

      <section className="form-section">
        <form action="" onSubmit={send}>
          <div className="header">
            <h2>Chat with lawjun</h2>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("chats");
                setChats([]);
              }}
            >
              Start new chat <span>+</span>
            </button>
          </div>
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

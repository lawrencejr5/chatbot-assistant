import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();
const ContextApp = ({ children }) => {
  // States
  const [value, setValue] = useState("");
  const [chatbotModal, setChatbotModal] = useState(false);
  const [chats, setChat] = useState([]);
  const [userMsg, setUserMsg] = useState({ id: 0, msg: "" });
  const [loading, setLoading] = useState(false);

  // Functions
  const userChat = (e) => {
    e.preventDefault();
    setChat((prev) => {
      let newList = [...prev, { type: "user", msg: value }];
      return newList;
    });
    setUserMsg((prev) => {
      let newVal = { ...prev, id: prev.id++, msg: value };
      return newVal;
    });
    setValue("");
  };
  const botChat = (msg) => {
    setChat((prev) => {
      let newList = [...prev, { type: "bot", msg }];
      return newList;
    });
  };

  // Effects
  useEffect(() => {
    if (userMsg.msg != "") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (
          userMsg.msg.toLowerCase().includes("hi") ||
          userMsg.msg.toLowerCase().includes("wassup") ||
          userMsg.msg.toLowerCase().includes("hello") ||
          userMsg.msg.toLowerCase().includes("afa")
        ) {
          botChat("Hello, wetin I go fit do for you today?");
        } else if (
          userMsg.msg.toLowerCase().includes("career advice") ||
          userMsg.msg.toLowerCase().includes("career")
        ) {
          botChat("Ok, noted");
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            botChat("I go need grab some details from u.");
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              botChat("Which wan u prefer, food or money?");
            }, 1000);
          }, 1000);
        } else if (
          userMsg.msg.toLowerCase().includes("how you dey") ||
          userMsg.msg.toLowerCase().includes("how are you") ||
          userMsg.msg.toLowerCase().includes("how u dey") ||
          userMsg.msg.toLowerCase().includes("how are u")
        ) {
          botChat("I'm good");
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            botChat("But I don't care about u");
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              botChat("Wetin u go like make I do for u?");
            }, 1000);
          }, 1000);
        } else if (userMsg.msg.toLowerCase().includes("money")) {
          botChat("U too like money :):)");
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            botChat("Anyways...");
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              botChat("Wetin I go advice u b say make u go open pos shop :):)");
            }, 1000);
          }, 1000);
        } else if (userMsg.msg.toLowerCase().includes("food")) {
          botChat("Hw u go prefer food to money??");
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            botChat("Anyways...");
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              botChat(
                "Wetin I go advice u b say make u start to dey sell ukpa :):)"
              );
            }, 1000);
          }, 1000);
        } else if (userMsg.msg.toLowerCase().includes("sorry")) {
          botChat("Why u dey apologize to AI dis guy??");
        } else if (userMsg.msg.toLowerCase().includes("bye")) {
          botChat("Fuck off!!");
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            botChat("Closing chat space....");
            setTimeout(() => {
              setChatbotModal(false);
            }, 1000);
          }, 1000);
        } else {
          botChat("Ma guy, I no know wetin u dey type :(");
        }
      }, 1000);
    }
  }, [userMsg]);

  return (
    <AppContext.Provider
      value={{
        value,
        setValue,
        chatbotModal,
        setChatbotModal,
        chats,
        setChat,
        userChat,
        botChat,
        loading,
        userMsg,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { ContextApp, useGlobalContext };

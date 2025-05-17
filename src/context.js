import React, { createContext, useContext, useState, useEffect } from "react";
import { jokes, quotes } from "./data";

const AppContext = createContext();
const ContextApp = ({ children }) => {
  // getting chats from local storage
  const localChats = localStorage.getItem("chats")
    ? JSON.parse(localStorage.getItem("chats"))
    : [];

  // States
  const [value, setValue] = useState("");
  const [chatbotModal, setChatbotModal] = useState(false);
  const [chats, setChat] = useState(localChats);
  const [userMsg, setUserMsg] = useState({ id: 0, msg: "" });
  const [loading, setLoading] = useState(false);
  const [jRand, setJRand] = useState(0);
  const [qRand, setQRand] = useState(0);
  const [categ, setCateg] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  // Functions
  const userChat = () => {
    if (value) {
      setChat((prev) => {
        let newList = [...prev, { type: "user", msg: value }];
        return newList;
      });
      setUserMsg((prev) => {
        let newVal = { ...prev, id: prev.id++, msg: value };
        return newVal;
      });
      setValue("");
    }
  };

  const botChat = (msg) => {
    setChat((prev) => {
      let newList = [...prev, { type: "bot", msg }];
      return newList;
    });
  };

  const randomize = (arr, randFunc) => {
    let rand_no = Math.floor(Math.random() * arr.length);
    randFunc((prev) => {
      if (prev == rand_no) {
        if (prev == arr.length - 1) {
          return 0;
        } else {
          return rand_no++;
        }
      }
      return rand_no;
    });
  };

  let d = new Date();
  const getTime = () => {
    let hr = d.getHours();
    let min = d.getMinutes();
    let m;
    hr > 12 ? (m = "PM") : (m = "AM");
    hr == 0 && (hr = 12);
    const time = `${hr}:${min} ${m}`;
    setTime(time);
  };

  const getTdDate = () => {
    const weeks = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let date = d.getDate();
    let day = weeks[d.getDay()];
    let yr = d.getFullYear();
    let mth = months[d.getMonth()];
    const tdDate = `${day}, ${date} ${mth}, ${yr}`;
    setDate(tdDate);
  };
  // Effects
  useEffect(() => {
    getTime();
    getTdDate();
  });

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    randomize(quotes, setQRand);
    randomize(jokes, setJRand);

    // Bot messaging based on user inputs
    if (userMsg.msg != "") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        if (
          userMsg.msg.toLowerCase().includes("hi") ||
          userMsg.msg.toLowerCase().includes("wassup") ||
          userMsg.msg.toLowerCase().includes("hello") ||
          userMsg.msg.toLowerCase().includes("afa") ||
          userMsg.msg.toLowerCase().includes("good day") ||
          userMsg.msg.toLowerCase().includes("good morning") ||
          userMsg.msg.toLowerCase().includes("good afternoon") ||
          userMsg.msg.toLowerCase().includes("good evening") ||
          userMsg.msg.toLowerCase().includes("hey")
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
          userMsg.msg.toLowerCase().includes("tell me a joke") ||
          userMsg.msg.toLowerCase().includes("joke")
        ) {
          setCateg("joke");
          botChat(jokes[jRand]);
        } else if (
          userMsg.msg.toLowerCase().includes("give me a quote") ||
          userMsg.msg.toLowerCase().includes("quote")
        ) {
          setCateg("quote");
          botChat(quotes[qRand]);
        } else if (
          categ == "joke" &&
          (userMsg.msg.toLowerCase().includes("another one") ||
            userMsg.msg.toLowerCase().includes("another") ||
            userMsg.msg.toLowerCase().includes("next") ||
            userMsg.msg.toLowerCase().includes("again"))
        ) {
          botChat(jokes[jRand]);
        } else if (
          categ == "quote" &&
          (userMsg.msg.toLowerCase().includes("another one") ||
            userMsg.msg.toLowerCase().includes("another") ||
            userMsg.msg.toLowerCase().includes("next") ||
            userMsg.msg.toLowerCase().includes("again"))
        ) {
          botChat(quotes[qRand]);
        } else if (
          userMsg.msg.toLowerCase().includes("how you dey") ||
          userMsg.msg.toLowerCase().includes("how are you") ||
          userMsg.msg.toLowerCase().includes("how u dey") ||
          userMsg.msg.toLowerCase().includes("how are u")
        ) {
          botChat("Dooh, I'm a Bot");
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            botChat("I don't have feelings");
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
        } else if (userMsg.msg.toLowerCase().includes("goat")) {
          botChat("Cristiano Ronaldo is the ultimate goat");
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            botChat("Suuuuuu!!!!!");
          }, 1000);
        } else if (
          userMsg.msg.toLowerCase().includes("who created you") ||
          userMsg.msg.toLowerCase().includes("who is your creator") ||
          userMsg.msg.toLowerCase().includes("who made you")
        ) {
          botChat("Person wey create me na one bad guy like that");
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            botChat("En name na Oputa Lawrence Jr");
          }, 1000);
        } else if (userMsg.msg.toLowerCase().includes("sorry")) {
          botChat("Why u dey apologize to AI??");
        } else if (userMsg.msg.toLowerCase().includes("time")) {
          botChat(`The time na ${time}`);
        } else if (userMsg.msg.toLowerCase().includes("date")) {
          botChat(`Today's date na ${date}`);
        } else if (userMsg.msg.toLowerCase().includes("You are awesome")) {
          botChat("Normally, dem no need tell me :p");
        } else if (
          userMsg.msg.toLowerCase().includes("bye") ||
          userMsg.msg.toLowerCase().includes("boring") ||
          userMsg.msg.toLowerCase().includes("close chat")
        ) {
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
          botChat(
            "No vex, I no understand wetin u type, try put am in another way"
          );
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

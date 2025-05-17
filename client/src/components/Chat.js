import React, { useRef, useEffect } from "react";
import { useGlobalContext } from "../context";
const Chat = ({ type, msg }) => {
  const { userMsg } = useGlobalContext();
  const divRef = useRef(null);
  useEffect(() => {
    divRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [userMsg]);
  return (
    <>
      <div className={`msg-${type}`} ref={divRef}>
        <span>{msg}</span>
      </div>
      <br />
    </>
  );
};

export default Chat;

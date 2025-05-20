import React, { useEffect, useState } from "react";

const Typewriter = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};

export default Typewriter;

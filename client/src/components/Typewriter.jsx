import React, { useEffect, useState } from "react";

const Typewriter = ({ text, speed = 100, shouldAnimate = true }) => {
  const [displayedText, setDisplayedText] = useState("");

  const formatText = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />");
  };

  useEffect(() => {
    if (!shouldAnimate) {
      setDisplayedText(text);
      return;
    }

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

  return <div dangerouslySetInnerHTML={{ __html: formatText(text) }} />;
};

export default Typewriter;

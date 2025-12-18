import { useEffect, useState } from "react";

export function useTypewriter(text: string, speed = 28) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");

    const id = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i += 1;
      if (i > text.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return displayed;
}

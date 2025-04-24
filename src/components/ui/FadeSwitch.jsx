"use client";

import { useEffect, useState } from "react";

export default function FadeSwitch({ children, activeKey }) {
  const [displayed, setDisplayed] = useState(children);
  const [fade, setFade] = useState("opacity-100 scale-100");

  useEffect(() => {
    setFade("opacity-0 scale-95");
    const timeout = setTimeout(() => {
      setDisplayed(children);
      setFade("opacity-100 scale-100");
    }, 150);

    return () => clearTimeout(timeout);
  }, [activeKey, children]);

  return (
    <div className={`transition-all duration-300 ease-in-out ${fade}`}>
      {displayed}
    </div>
  );
}

import { useState, useEffect } from "react";
import { useThrottle } from "./useThrottle";

export const useScrollEnd = () => {
  const [scrollEnd, setScrollEnd] = useState(false);

  const handleScroll = useThrottle({
    callback: () => {
      console.log("scroll");
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 50;
      setScrollEnd(isBottom);
    },
    delay: 300,
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollEnd;
};

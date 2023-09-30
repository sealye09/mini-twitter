import { useEffect } from "react";

import { useThrottle } from "./useThrottle";

export const useScrollEnd = (callback: () => void) => {
  const handleScroll = useThrottle({
    callback: () => {
      console.log("scroll");
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.clientHeight;
      const scrollY = window.scrollY;
      if (windowHeight + scrollY + 50 >= documentHeight) {
        console.log("end");
        callback();
      }
    },
    delay: 500,
  });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [callback]);
};

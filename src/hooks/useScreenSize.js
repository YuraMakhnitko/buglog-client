import { useEffect, useState } from "react";

export const useScreenSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    const resizeHandle = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", resizeHandle);

    resizeHandle();

    return () => window.removeEventListener("resize", resizeHandle);
  }, []);
  return windowSize;
};

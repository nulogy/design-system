import { useEffect } from "react";
import keyCodes from '../constants/keyCodes';

const HandleEsc = (handler) => {

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.keyCode) {
        case keyCodes.ESC:
          handler();
          break;
        default:
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    const cleanup = () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    return cleanup;
  }, []);

  return;
};

export default HandleEsc;

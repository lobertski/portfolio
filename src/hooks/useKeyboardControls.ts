import { useState, useEffect } from "react";
export const useKeyboardControls = () => {
  const [controls, setControls] = useState({
    left: false,
    right: false,
    interact: false, // Space or Enter
  });
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          setControls((prev) => ({
            ...prev,
            left: true,
          }));
          break;
        case "ArrowRight":
        case "d":
        case "D":
          setControls((prev) => ({
            ...prev,
            right: true,
          }));
          break;
        case "Enter":
        case " ":
          setControls((prev) => ({
            ...prev,
            interact: true,
          }));
          break;
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
        case "a":
        case "A":
          setControls((prev) => ({
            ...prev,
            left: false,
          }));
          break;
        case "ArrowRight":
        case "d":
        case "D":
          setControls((prev) => ({
            ...prev,
            right: false,
          }));
          break;
        case "Enter":
        case " ":
          setControls((prev) => ({
            ...prev,
            interact: false,
          }));
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return controls;
};

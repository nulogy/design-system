import React, { ReactNode, useEffect, useState } from "react";

type Reference = {
  current?: JSX.Element;
  focus?: (...args: any[]) => any;
};

type ChildrenHandlers = {
  focusedIndex: number;
  handleArrowNavigation: Function;
  setFocusedIndex: Function;
};

type FocusManagerProps = {
  refs?: Array<Reference>;
  defaultFocusedIndex: number | null;
  children: (handlers: ChildrenHandlers) => ReactNode;
};

const FocusManager: React.FC<FocusManagerProps> = ({ children, refs = undefined, defaultFocusedIndex }) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(defaultFocusedIndex ?? 0);

  const focusPrevious = () => {
    setFocusedIndex((prevFocusedIndex) => (prevFocusedIndex - 1 + refs.length) % refs.length);
  };

  const focusNext = () => {
    setFocusedIndex((prevFocusedIndex) => (prevFocusedIndex + 1) % refs.length);
  };

  const handleArrowNavigation = (e) => {
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        focusPrevious();
        break;
      case "ArrowRight":
        e.preventDefault();
        focusNext();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const updateFocused = () => {
      refs[focusedIndex].focus();
    };

    updateFocused();
  }, [focusedIndex, refs]);

  return (
    <>
      {children({
        focusedIndex,
        setFocusedIndex,
        handleArrowNavigation: handleArrowNavigation,
      })}
    </>
  );
};

export default FocusManager;

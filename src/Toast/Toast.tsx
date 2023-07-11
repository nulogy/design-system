import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Alert, { AlertProps } from "../Alert/Alert";
import { AnimatedBox } from "../Box";

type ToastProps = AlertProps & {
  triggered?: boolean;
  isCloseable?: boolean;
  showDuration?: number;
  onShow?: () => void;
  onHide?: () => void;
  onHidden?: () => void;
};

export const TOAST_SHOW_DURATION = 5000; // in ms
const ANIMATE_OUT_DURATION = 1000;

export const toastAnimationConfig = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: -30,
    transition: { type: "spring", bounce: 0.4, duration: 0.6 },
  },
  exit: {
    y: 50,
    opacity: 0,
    transition: { ease: "easeOut", duration: 0.15 },
  },
};

export const Toast = ({
  triggered,
  onHide,
  onShow,
  isCloseable,
  children,
  showDuration,
  onHidden,
  zIndex,
  ...props
}: ToastProps) => {
  const [visible, setVisible] = useState(triggered);
  const [timeoutID, setTimeoutID] = useState<number | undefined>(undefined);

  const cancelHidingToast = () => {
    clearTimeout(timeoutID);
  };

  const hideToast = (delay = TOAST_SHOW_DURATION) => {
    cancelHidingToast();
    let timeoutId: number;

    timeoutId = window.setTimeout(() => {
      setVisible(false);
      if (onHide) onHide();

      timeoutId = window.setTimeout(() => {
        if (onHidden) onHidden();
      }, ANIMATE_OUT_DURATION);
    }, delay);

    setTimeoutID(timeoutId);
  };

  const triggerToast = () => {
    setVisible(true);
    if (onShow) onShow();
    if (!isCloseable) hideToast(showDuration);
  };

  useEffect(() => {
    if (triggered) {
      triggerToast();
    } else {
      setVisible(false);
      if (onHide) onHide();
    }

    return () => {
      cancelHidingToast();
    };
  }, [triggered]);

  const onMouseIn = () => {
    if (!isCloseable) {
      cancelHidingToast();
    }
  };

  const onMouseOut = () => {
    if (!isCloseable) {
      hideToast(TOAST_SHOW_DURATION / 2);
    }
  };

  const handleCloseButtonClick = () => {
    hideToast(0);
  };

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <AnimatedBox
          onMouseEnter={onMouseIn}
          /* @ts-ignore */
          onFocus={onMouseIn}
          onMouseLeave={onMouseOut}
          onBlur={onMouseOut}
          position="fixed"
          bottom="0"
          left="0"
          right="0"
          marginLeft="auto"
          marginRight="auto"
          width="fit-content"
          zIndex={zIndex}
          boxShadow="medium"
          layout
          {...toastAnimationConfig}
        >
          {/* @ts-ignore */}
          <Alert
            minWidth="200px"
            maxWidth="600px"
            isCloseable={isCloseable}
            onClose={handleCloseButtonClick}
            controlled
            {...props}
          >
            {children}
          </Alert>
        </AnimatedBox>
      )}
    </AnimatePresence>
  );
};

Toast.defaultProps = {
  triggered: false,
  isCloseable: false,
  showDuration: TOAST_SHOW_DURATION,
  onShow: () => {},
  onHide: () => {},
  onHidden: () => {},
};

export default Toast;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import { Box } from "../Box";
import { Alert } from "../Alert";

const ANIMATION_DURATION = 2000; // in ms
const TOAST_Y_MAX = "0px";
const TOAST_Y_MIN = "-32px";
const ACTIVE_Z_INDEX = 2;
const INACTIVE_Z_INDEX = ACTIVE_Z_INDEX - 1;

const SLIDE_IN_STYLES = {
  transform: `translateY(${TOAST_Y_MIN})`,
  transition: "transform 0.15s ease-out",
  zIndex: ACTIVE_Z_INDEX
};

const SLIDE_OUT_STYLES = {
  transform: `translateY(${TOAST_Y_MAX})`,
  transition: "transform 0.9s ease-in",
  zIndex: INACTIVE_Z_INDEX
};

const FADE_IN_STYLES = {
  opacity: 1,
  transition: "opacity 0.25s linear"
};

const FADE_OUT_STYLES = {
  transition: "opacity 1s linear"
};

const AnimatedAlert = styled(Alert)(({ visible }) => ({
  boxShadow: theme.shadows.medium,
  minWidth: "200px",
  maxWidth: "600px",
  opacity: 0,
  ...(visible ? FADE_IN_STYLES : FADE_OUT_STYLES)
}));

const AnimatedBoxBottom = styled(Box)(({ visible }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  marginLeft: "auto",
  marginRight: "auto",
  width: "fit-content",
  tranform: `translateY(${TOAST_Y_MIN})`,
  ...(visible ? SLIDE_IN_STYLES : SLIDE_OUT_STYLES)
}));

export const Toast = ({ triggered, onHide, onShow, children, ...props }) => {
  const [visible, setVisible] = useState(triggered);
  const [timeoutID, setTimeoutID] = useState(undefined);
  const cancelHidingToast = () => {
    clearTimeout(timeoutID);
  };
  const hideToast = (delay = ANIMATION_DURATION) => {
    cancelHidingToast();
    setTimeoutID(
      setTimeout(() => {
        setVisible(false);
        onHide();
      }, delay)
    );
  };
  const triggerToast = () => {
    setVisible(true);
    onShow();
    hideToast();
  };

  useEffect(() => {
    if (triggered) {
      triggerToast();
    } else {
      setVisible(false);
      onHide();
    }
  }, [triggered]);

  const onMouseIn = () => {
    cancelHidingToast(timeoutID);
  };
  const onMouseOut = () => {
    hideToast(ANIMATION_DURATION / 2);
  };

  return (
    <AnimatedBoxBottom
      visible={visible}
      onMouseEnter={onMouseIn}
      onFocus={onMouseIn}
      onMouseLeave={onMouseOut}
      onBlur={onMouseOut}
    >
      <AnimatedAlert visible={visible} {...props}>
        {children}
      </AnimatedAlert>
    </AnimatedBoxBottom>
  );
};

Toast.propTypes = {
  triggered: PropTypes.bool,
  onShow: PropTypes.func,
  onHide: PropTypes.func,
  children: PropTypes.node
};

Toast.defaultProps = {
  triggered: false,
  onShow: () => {},
  onHide: () => {},
  children: undefined
};

export default Toast;

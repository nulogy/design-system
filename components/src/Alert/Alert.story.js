import React, { useState } from "react";
import styled, { css, keyframes, createGlobalStyle } from "styled-components";
import { storiesOf } from "@storybook/react";
import { Alert } from "../index";
import { Link } from "../Link";
import { Button } from "../Button";
import theme from "../theme";
import { Box } from "../Box";

const ANIMATION_DURATION = 2;
const TOAST_Y = "-56px";

export const fadeIn = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
`;

export const fadeOut = keyframes`
0% {
  opacity: 1;
}
100% {
  opacity: 0;
}
`;

export const slideOut = keyframes`
0% {
  bottom: 0;
}
100% {
  bottom: ${TOAST_Y};
}
`;

export const slideIn = keyframes`
0% {
  bottom: ${TOAST_Y};
}
100% {
  bottom: 0;
}
`;

const slideInStyle = css`
  animation-name: ${slideIn};
  animation-duration: 0.15s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-out;
  animation-delay: 0.1s;
`;

const slideOutStyle = css`
  animation-name: ${slideOut};
  animation-duration: 0.9s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in;
}`;

const fadeInStyle = css`
  animation-name: ${fadeIn};
  animation-duration: 0.25s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
`;

const fadeOutStyle = css`
  animation-name: ${fadeOut};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}`;

const AnimatedAlertBottom = styled(Alert)`
  box-shadow: ${theme.shadows.medium};
  min-width: 200px;
  ${props => (props.visible ? fadeInStyle : fadeOutStyle)};
`;

const AnimatedBoxBottom = styled(Box)`
  box-shadow: ${theme.shadows.medium};
  position: absolute;
  bottom: ${TOAST_Y};
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  width: 200px;
  ${props => (props.visible ? slideInStyle : slideOutStyle)};
`;
storiesOf("Alert", module)
  .add("Danger", () => <Alert type="danger">Danger alert</Alert>)
  .add("Informative", () => <Alert>Informative alert</Alert>)
  .add("Success", () => <Alert type="success">Success alert</Alert>)
  .add("Warning", () => <Alert type="warning">Warning alert</Alert>)
  .add("With a close button", () => <Alert isCloseable>Warning alert</Alert>)
  .add("Toast - bottom", () => {
    const [visible, setVisible] = useState(false);
    const [triggered, setTriggered] = useState(false);
    const triggerToast = () => {
      if (!triggered) setTriggered(true);
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, ANIMATION_DURATION * 1000);
    };
    return (
      <>
        <Button onClick={triggerToast}>Toast!</Button>
        {triggered && (
          <AnimatedBoxBottom visible={visible}>
            <AnimatedAlertBottom visible={visible} type="success">
              Toasted!
            </AnimatedAlertBottom>
          </AnimatedBoxBottom>
        )}
      </>
    );
  })
  .add("With a title", () => (
    <Alert title="Danger title!" type="danger">
      Danger alert
    </Alert>
  ))
  .add("With a link", () => (
    <Alert>
      An alert with <Link href="/">linked details</Link>.
    </Alert>
  ));

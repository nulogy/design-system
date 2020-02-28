import React, { useState } from "react";
import styled, { css } from "styled-components";
import { storiesOf } from "@storybook/react";
import { Alert } from "../index";
import { Link } from "../Link";
import { Button } from "../Button";
import theme from "../theme";

const ANIMATION_DURATION = 4;
const TOAST_Y_MAX = "50px";

const AnimatedAlertBottom = styled(Alert)`
  @keyframes toast {
    0% {
      opacity: 0;
      bottom: 0px;
    }
    20% {
      opacity: 100%;
      bottom: ${TOAST_Y_MAX};
    }
    85% {
      opacity: 100%;
      bottom: ${TOAST_Y_MAX};
    }
    100% {
      opacity: 0;
      bottom: ${TOAST_Y_MAX / 2};
    }
  }
  animation: toast ${ANIMATION_DURATION}s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
  position: absolute;
  bottom: 15px;
  right: 15px;
  min-width: 200px;
  box-shadow: ${theme.shadows.medium};
`;

const AnimatedAlertRight = styled(Alert)`
  @keyframes toast {
    0% {
      opacity: 0;
      transform: translateX(100%);
    }
    10% {
      opacity: 100%;
      transform: translateX(0);
    }
    85% {
      opacity: 100%;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(100%);
    }
  }
  animation: toast ${ANIMATION_DURATION}s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  position: absolute;
  right: 15px;
  top: 20px;
  min-width: 200px;
  box-shadow: ${theme.shadows.medium};
`;
storiesOf("Alert", module)
  .add("Danger", () => <Alert type="danger">Danger alert</Alert>)
  .add("Informative", () => <Alert>Informative alert</Alert>)
  .add("Success", () => <Alert type="success">Success alert</Alert>)
  .add("Warning", () => <Alert type="warning">Warning alert</Alert>)
  .add("With a close button", () => <Alert isCloseable>Warning alert</Alert>)
  .add("Toast - bottom", () => {
    const [visible, setVisible] = useState(false);
    const triggerToast = () => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, ANIMATION_DURATION * 1000);
    };
    return (
      <>
        <Button onClick={triggerToast}>Toast!</Button>
        {visible && <AnimatedAlertBottom type="success">Toasted!</AnimatedAlertBottom>}
      </>
    );
  })
  .add("Toast - right", () => {
    const [visible, setVisible] = useState(false);
    const triggerToast = () => {
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
      }, ANIMATION_DURATION * 1000);
    };
    return (
      <>
        <Button onClick={triggerToast}>Toast!</Button>
        {visible && <AnimatedAlertRight type="success">Toasted!</AnimatedAlertRight>}
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

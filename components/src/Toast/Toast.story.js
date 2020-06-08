import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Button, DangerButton, IconicButton, PrimaryButton } from "../Button";
import { Flex } from "../Flex";
import { Toast } from ".";

storiesOf("Toast", module)
  .add("Toast", () => {
    const ToastWithTrigger = () => {
      const [triggered, setTriggered] = useState(false);
      const triggerToast = () => {
        setTriggered(!triggered);
      };
      const onHideHandler = () => {
        setTriggered(false);
      };
      return (
        <>
          <Button onClick={triggerToast}>Save Changes</Button>
          <Toast triggered={triggered} onHide={onHideHandler}>
            Saved
          </Toast>
        </>
      );
    };
    return <ToastWithTrigger />;
  })
  .add("multiple toasts example", () => {
    const MultipleToastsExample = () => {
      const [currentToast, setCurrentToast] = useState(undefined);
      const triggerToast = toastName => {
        setCurrentToast(toastName);
      };
      /* Alternate trigger toast fn adds a delay between toasts
    const triggerToast = toastName => {
      if (!currentToast) {
        setCurrentToast(toastName);
      } else {
        // adds a delay between toasts
        setTimeout(() => {
          setCurrentToast(toastName);
        }, 200);
      }
    }; */
      const onHideHandler = toastName => {
        if (currentToast === toastName) {
          setCurrentToast(undefined);
        }
      };
      const TOAST_ACTIONS = {
        SAVE: "save",
        RESET: "reset",
        DELETE: "delete",
        ERROR: "error"
      };
      const TOASTS = [
        {
          action: TOAST_ACTIONS.SAVE,
          message: "Saved all your changes",
          type: "success"
        },
        {
          action: TOAST_ACTIONS.RESET,
          message: "Reset all your changes",
          type: "success"
        },
        {
          action: TOAST_ACTIONS.DELETE,
          message: "Ok, it's deleted",
          type: "success"
        },
        {
          action: TOAST_ACTIONS.ERROR,
          message: "An error occurred, please retry",
          type: "danger"
        }
      ];
      return (
        <>
          <Flex alignItems="center">
            <PrimaryButton onClick={() => triggerToast(TOAST_ACTIONS.SAVE)} mr="x2">
              Save Changes
            </PrimaryButton>
            <Button onClick={() => triggerToast(TOAST_ACTIONS.RESET)} mr="x2">
              Reset
            </Button>
            <DangerButton onClick={() => triggerToast(TOAST_ACTIONS.ERROR)} mr="x2">
              Trigger Error
            </DangerButton>
            <IconicButton icon="delete" onClick={() => triggerToast(TOAST_ACTIONS.DELETE)}>
              Delete
            </IconicButton>
          </Flex>
          {TOASTS.map(toast => {
            return (
              <Toast
                triggered={currentToast === toast.action}
                onHide={() => onHideHandler(toast.action)}
                type={toast.type}
                key={toast.action}
              >
                {toast.message}
              </Toast>
            );
          })}
        </>
      );
    };
    return <MultipleToastsExample />;
  })
  .add("customize length of time toast is visible", () => {
    const ToastWithTrigger = () => {
      const [triggered, setTriggered] = useState(false);
      const triggerToast = () => {
        setTriggered(!triggered);
      };
      const onHideHandler = () => {
        setTriggered(false);
      };
      return (
        <>
          <Button onClick={triggerToast}>Save Changes</Button>
          <Toast triggered={triggered} onHide={onHideHandler} showDuration={5000}>
            Saved
          </Toast>
        </>
      );
    };
    return <ToastWithTrigger />;
  })
  .add("with close button", () => {
    const ToastWithTrigger = () => {
      const [triggered, setTriggered] = useState(false);
      const triggerToast = () => {
        setTriggered(!triggered);
      };
      const onHideHandler = () => {
        setTriggered(false);
      };
      return (
        <>
          <Button onClick={triggerToast}>Save Changes</Button>
          <Toast triggered={triggered} onHide={onHideHandler} isCloseable>
            Saved
          </Toast>
        </>
      );
    };
    return <ToastWithTrigger />;
  });

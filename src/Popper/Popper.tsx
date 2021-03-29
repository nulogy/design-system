// @ts-nocheck
import React, { useState, useEffect } from "react";
import { usePopper } from "react-popper-latest";
import { useTranslation } from "react-i18next";
import { Box } from "../Box";
import { PopperArrow } from "../utils";
import { keyCodes } from "../constants";

type PopperProps = {
  ref: any;
  placement?: string;
  defaultOpen?: boolean;
  showDelay?: string | number;
  hideDelay?: string | number;
  id?: string;
  trigger: React.ReactNode;
  openOnClick?: boolean;
  openOnHover?: boolean;
  modifiers?: [];
  backgroundColor?: string;
  borderColor?: string;
  showArrow?: boolean;
  openAriaLabel?: string;
  closeAriaLabel?: string;
};
const Popper: React.SFC<PopperProps> = React.forwardRef(
  (
    {
      placement,
      defaultOpen,
      id,
      showDelay,
      hideDelay,
      trigger,
      children,
      openOnClick,
      openOnHover,
      modifiers,
      backgroundColor,
      borderColor,
      showArrow,
      openAriaLabel,
      closeAriaLabel,
    },
    popperRef
  ) => {
    let timeoutID;
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [arrowElement, setArrowElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement,
      modifiers: [
        { name: "offset", options: { offset: [0, 4] } },
        {
          name: "arrow",
          options: {
            element: arrowElement,
            padding: 10, // for offset of the arrow from the border-radius only
          },
        },
        ...modifiers,
      ],
    });
    const conditionallyApplyDelay = (fnc, delay, skipDelay = true) => {
      if (!skipDelay) {
        timeoutID = setTimeout(fnc, delay);
      } else {
        fnc();
      }
    };
    const setPopUpState = (nextIsOpenState, skipDelay) => {
      clearTimeout(timeoutID);
      conditionallyApplyDelay(
        () => setIsOpen(nextIsOpenState),
        nextIsOpenState ? showDelay : hideDelay,
        skipDelay
      );
    };
    const closePopUp = (skipDelay) => {
      setPopUpState(false, skipDelay);
    };
    useEffect(() => {
      const handleKeyDown = (event) => {
        switch (event.keyCode) {
          case keyCodes.ESC:
            closePopUp();
            break;
          default:
            break;
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      const cleanup = () => {
        document.removeEventListener("keydown", handleKeyDown);
        clearTimeout(timeoutID);
      };
      return cleanup;
    }, []);
    const openPopUp = (skipDelay) => {
      setPopUpState(true, skipDelay);
    };
    const onClickEventHandlers = openOnClick
      ? {
          onMouseDown: () => {
            if (isOpen) {
              closePopUp(false);
            } else {
              openPopUp(false);
            }
          },
        }
      : null;
    const onHoverHandlers = openOnHover
      ? {
          onMouseEnter: () => openPopUp(false),
          onMouseLeave: () => closePopUp(false),
        }
      : null;
    const eventHandlers = {
      onFocus: () => openPopUp(false),
      onBlur: () => {
        closePopUp(false);
      },
      ...onHoverHandlers,
      ...onClickEventHandlers,
    };
    const { t } = useTranslation();
    const openLabel = openAriaLabel || t("open");
    const closeLabel = closeAriaLabel || t("close");
    return (
      <>
        <trigger.type
          {...trigger.props}
          ref={setReferenceElement}
          aria-haspopup={true}
          aria-expanded={isOpen}
          aria-describedby={id}
          aria-label={isOpen ? closeLabel : openLabel}
          {...eventHandlers}
        />

        <Box
          ref={setPopperElement}
          style={styles.popper}
          display={isOpen ? "block" : "none"}
          position="relative"
          {...attributes.popper}
        >
          {children}
          {showArrow && (
            <PopperArrow
              key="popper-arrow"
              placement={placement}
              ref={setArrowElement}
              style={styles.arrow}
              backgroundColor={backgroundColor}
              borderColor={borderColor}
            />
          )}
        </Box>
      </>
    );
  }
);
Popper.defaultProps = {
  showDelay: "100",
  hideDelay: "350",
  defaultOpen: false,
  placement: "bottom",
  id: null,
  openOnClick: false,
  openOnHover: true,
  modifiers: [],
  backgroundColor: undefined,
  borderColor: undefined,
  showArrow: true,
  openAriaLabel: undefined,
  closeAriaLabel: undefined,
};
export default Popper;

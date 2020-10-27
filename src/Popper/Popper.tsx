// @ts-nocheck
import React, { useState, useEffect } from "react";
import { Manager, Reference, Popper as ReactPopperPopUp } from "react-popper";
import { useTranslation } from "react-i18next";
import { PopperArrow } from "../utils";
import { keyCodes } from "../constants";
const makeArray = (children) => {
  if (!Array.isArray(children)) {
    return [children];
  }
  return children;
};
const wrapInFunction = (x) => (typeof x === "function" ? x : () => x);
type PopperProps = {
  ref: any;
  popperPlacement?: string;
  defaultOpen?: boolean;
  showDelay?: string | number;
  hideDelay?: string | number;
  id?: string;
  trigger: React.ReactNode;
  openOnClick?: boolean;
  openOnHover?: boolean;
  modifiers?: {};
  backgroundColor?: string;
  borderColor?: string;
  showArrow?: boolean;
  openAriaLabel?: string;
  closeAriaLabel?: string;
};
const Popper: React.SFC<PopperProps> = React.forwardRef(
  (
    {
      popperPlacement,
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
    const transformInnerChildren = (elements) =>
      makeArray(elements).map((element, i) => {
        const transformedElement = wrapInFunction(element)({
          closeMenu: (e) => {
            closePopUp();
            e.stopPropagation();
          },
          openMenu: (e) => {
            openPopUp();
            e.stopPropagation();
          },
        });
        return React.cloneElement(transformedElement, {
          // eslint-disable-next-line react/no-array-index-key
          key: i,
        });
      });
    const renderInnerChildren = () => {
      const innerChildren = children.props.children;
      return typeof innerChildren !== "string"
        ? transformInnerChildren(innerChildren)
        : innerChildren;
    };
    const { t } = useTranslation();
    const openLabel = openAriaLabel || t("open");
    const closeLabel = closeAriaLabel || t("close");
    return (
      <Manager ref={popperRef}>
        <Reference>
          {({ ref }) =>
            React.cloneElement(trigger, {
              "aria-haspopup": true,
              "aria-expanded": isOpen,
              "aria-describedby": id,
              "aria-label": isOpen ? closeLabel : openLabel,
              ...eventHandlers,
              ref,
            })
          }
        </Reference>
        <ReactPopperPopUp placement={popperPlacement} modifiers={modifiers}>
          {({ ref, style, placement, arrowProps }) => (
            <>
              {isOpen &&
                React.cloneElement(
                  children,
                  {
                    open: isOpen,
                    ref,
                    id,
                    style: {
                      position: "absolute",
                      ...(isOpen ? style : null),
                      top: isOpen ? 0 : "-9999px",
                    },
                    dataPlacement: placement,
                    className: `${
                      children.props.className || ""
                    } nds-popper-pop-up`,
                    ...eventHandlers,
                  },
                  [
                    ...renderInnerChildren(),
                    showArrow && (
                      <PopperArrow
                        key="popper-arrow"
                        {...arrowProps}
                        placement={placement}
                        ref={arrowProps.ref}
                        backgroundColor={backgroundColor}
                        borderColor={borderColor}
                      />
                    ),
                  ]
                )}
            </>
          )}
        </ReactPopperPopUp>
      </Manager>
    );
  }
);
Popper.defaultProps = {
  showDelay: "100",
  hideDelay: "350",
  defaultOpen: false,
  popperPlacement: "bottom",
  id: null,
  openOnClick: false,
  openOnHover: true,
  modifiers: null,
  backgroundColor: undefined,
  borderColor: undefined,
  showArrow: true,
  openAriaLabel: undefined,
  closeAriaLabel: undefined,
};
export default Popper;

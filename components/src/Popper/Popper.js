import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Manager, Reference, Popper as ReactPopperPopUp } from "react-popper";

import { PopperArrow } from "../utils";
import { keyCodes } from "../constants";

const Popper = React.forwardRef(
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
      showArrow
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
      conditionallyApplyDelay(() => setIsOpen(nextIsOpenState), nextIsOpenState ? showDelay : hideDelay, skipDelay);
    };
    const closePopUp = skipDelay => {
      setPopUpState(false, skipDelay);
    };
    useEffect(() => {
      const handleKeyDown = event => {
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

    const openPopUp = skipDelay => {
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
          }
        }
      : null;

    const onHoverHandlers = openOnHover
      ? {
          onMouseEnter: () => openPopUp(false),
          onMouseLeave: () => closePopUp(false)
        }
      : null;

    const eventHandlers = {
      onFocus: () => openPopUp(false),
      onBlur: () => {
        closePopUp(false);
      },
      ...onHoverHandlers,
      ...onClickEventHandlers
    };

    return (
      <Manager ref={popperRef}>
        <Reference>
          {({ ref }) =>
            React.cloneElement(trigger, {
              "aria-haspopup": true,
              "aria-expanded": isOpen,
              "aria-describedby": id,
              "aria-label": isOpen ? "Close" : "Open",
              ...eventHandlers,
              ref
            })
          }
        </Reference>
        <ReactPopperPopUp placement={popperPlacement} modifiers={modifiers}>
          {({ ref, style, placement, arrowProps }) => (
            <>
              {React.cloneElement(
                children,
                {
                  open: isOpen,
                  ref: node => {
                    ref(node);
                  },
                  id,
                  position: style,
                  dataPlacement: placement,
                  ...eventHandlers
                },
                [
                  children.props.children,
                  showArrow ? (
                    <PopperArrow
                      {...arrowProps}
                      placement={placement}
                      ref={arrowProps.ref}
                      backgroundColor={backgroundColor}
                      borderColor={borderColor}
                    />
                  ) : null
                ]
              )}
            </>
          )}
        </ReactPopperPopUp>
      </Manager>
    );
  }
);

Popper.propTypes = {
  popperPlacement: PropTypes.string,
  defaultOpen: PropTypes.bool,
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string,
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  openOnClick: PropTypes.bool,
  openOnHover: PropTypes.bool,
  modifiers: PropTypes.shape({}),
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  showArrow: PropTypes.bool
};

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
  showArrow: true
};

export default Popper;

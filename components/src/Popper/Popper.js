import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Manager, Reference, Popper as ReactPopper } from "react-popper";

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
      borderColor
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
    const setMenuState = (nextIsOpenState, skipDelay) => {
      clearTimeout(timeoutID);
      conditionallyApplyDelay(() => setIsOpen(nextIsOpenState), nextIsOpenState ? showDelay : hideDelay, skipDelay);
    };
    const closeMenu = skipDelay => {
      setMenuState(false, skipDelay);
    };
    const handleClickOutside = e => {
      closeMenu();
    };
    useEffect(() => {
      const handleKeyDown = event => {
        switch (event.keyCode) {
          case keyCodes.ESC:
            closeMenu();
            break;
          default:
            break;
        }
      };
      // document.addEventListener("onmousedown", handleClickOutside);

      document.addEventListener("keydown", handleKeyDown);

      const cleanup = () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("onMouseDown", handleClickOutside);
        clearTimeout(timeoutID);
      };
      return cleanup;
    }, []);

    const openMenu = skipDelay => {
      setMenuState(true, skipDelay);
    };
    const onClickEventHandlers = openOnClick
      ? {
          onMouseDown: () => {
            if (isOpen) {
              closeMenu(false);
            } else {
              openMenu(false);
            }
          }
        }
      : null;

    const onHoverHandlers = openOnHover
      ? {
          onMouseEnter: () => openMenu(false),
          onMouseLeave: () => closeMenu(false)
        }
      : null;

    const eventHandlers = {
      onFocus: () => openMenu(false),
      onBlur: () => {
        closeMenu(false);
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
              "aria-label": isOpen ? "Close menu" : "Open menu",
              ...eventHandlers,
              ref
            })
          }
        </Reference>
        <ReactPopper placement={popperPlacement} modifiers={modifiers}>
          {({ ref, style, placement, arrowProps }) => (
            <>
              {React.cloneElement(
                children,
                {
                  open: isOpen,
                  // id={id}
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
                  <PopperArrow
                    placement={placement}
                    ref={arrowProps.ref}
                    backgroundColor={backgroundColor}
                    borderColor={borderColor}
                  />
                ]
              )}
            </>
          )}
        </ReactPopper>
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
  borderColor: PropTypes.string
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
  borderColor: undefined
};

export default Popper;

import React, { useState } from "react";
import PropTypes from "prop-types";
import { Manager, Reference, Popper as ReactPopper } from "react-popper";

import { DetectOutsideClick, PopperArrow } from "../utils";

const Popper = ({ popperPlacement, defaultOpen, ariaDescribedBy, showDelay, hideDelay, trigger, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  let timeoutID;

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

  const openMenu = skipDelay => {
    setMenuState(true, skipDelay);
  };
  const eventHandlers = {
    onFocus: () => openMenu(false),
    onBlur: () => closeMenu(false),
    onMouseEnter: () => openMenu(false),
    onMouseLeave: () => closeMenu(false)
  };

  return (
    <Manager>
      <Reference>
        {({ ref }) =>
          React.cloneElement(trigger, {
            "aria-haspopup": true,
            "aria-expanded": isOpen,
            "aria-describedby": ariaDescribedBy,
            "aria-label": isOpen ? "Close menu" : "Open menu",
            ...eventHandlers,
            ref
          })
        }
      </Reference>
      <ReactPopper placement={popperPlacement}>
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
                position: style,
                dataPlacement: placement,
                ...eventHandlers
              },
              [
                children.props.children,
                <PopperArrow placement={placement} ref={arrowProps.ref} style={arrowProps.style} />
              ]
            )}
          </>
        )}
      </ReactPopper>
      {isOpen && (
        <DetectOutsideClick
          onClick={() => {
            openMenu();
          }}
        />
      )}
    </Manager>
  );
};

Popper.propTypes = {
  popperPlacement: PropTypes.string,
  defaultOpen: PropTypes.bool,
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ariaDescribedBy: PropTypes.string,
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired
};

Popper.defaultProps = {
  showDelay: "100",
  hideDelay: "350",
  defaultOpen: false,
  popperPlacement: "bottom",
  ariaDescribedBy: null
};

export default Popper;

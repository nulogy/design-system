// @ts-nocheck
import React from "react";
import { Manager, Reference, Popper as ReactPopperPopUp } from "react-popper";
import { useTranslation } from "react-i18next";
import { PopperArrow, DetectOutsideClick } from "../utils";
import { keyCodes } from "../constants";
import { Box } from "../Box";

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
const Popper: React.FC<PopperProps> = React.forwardRef(
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
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    const _popperRef = React.useRef(null);

    const { t } = useTranslation();
    const openLabel = openAriaLabel || t("open");
    const closeLabel = closeAriaLabel || t("close");

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

    const closePopUp = (skipDelay) => {
      setPopUpState(false, skipDelay);
    };

    const openPopUp = (skipDelay) => {
      setPopUpState(true, skipDelay);
    };

    const onClickEventHandlers = openOnClick
      ? {
          onClick: () => {
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

    const referenceEventHandlers = {
      onFocus: () => openPopUp(false),
      ...onHoverHandlers,
      ...onClickEventHandlers,
    };

    const popperEventHandlers = {
      onFocus: () => openPopUp(false),
      ...onHoverHandlers,
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
      return typeof innerChildren !== "string" ? transformInnerChildren(innerChildren) : innerChildren;
    };

    React.useEffect(() => {
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

    return (
      <Manager ref={popperRef}>
        <DetectOutsideClick onClick={() => closePopUp(true)} clickRef={_popperRef} />
        <Box ref={_popperRef} display="inline-flex">
          <Reference>
            {({ ref }) =>
              React.cloneElement(trigger, {
                "aria-haspopup": true,
                "aria-expanded": isOpen,
                "aria-describedby": id,
                "aria-label": isOpen ? closeLabel : openLabel,
                ...referenceEventHandlers,
                ref,
              })
            }
          </Reference>
          <ReactPopperPopUp placement={popperPlacement} modifiers={modifiers}>
            {({ ref, style, placement, arrowProps }) => {
              console.log({ ref });
              return (
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
                        className: `${children.props.className || ""} nds-popper-pop-up`,
                        ...popperEventHandlers,
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
              );
            }}
          </ReactPopperPopUp>
        </Box>
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

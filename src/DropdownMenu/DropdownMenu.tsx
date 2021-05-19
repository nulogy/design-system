// @ts-nocheck
import React, { useState } from "react";
import propTypes from "@styled-system/prop-types";
import { useTheme } from "styled-components";
import { useLayer, Arrow } from "react-laag";
import { AnimatePresence } from "framer-motion";
import { IconicButton } from "../Button";
import { getSubset, omitSubset } from "../utils/subset";
import DropdownMenuContainer from "./DropdownMenuContainer";
import HandleEsc from "../utils/HandleEsc";

const conditionallyApplyDelay = (fnc, delay) => {
  if (delay) {
    timeoutID = setTimeout(fnc, Number(delay));
  } else {
    fnc();
  }
};

const getLaagPlacement = (placement) => {
  return placement.includes("-") ? placement : `${placement}-center`;
};

type DropdownMenuProps = {
  className?: string;
  id?: string;
  disabled?: boolean;
  trigger?: React.ReactNode | ((...args: any[]) => any);
  backgroundColor?: string;
  showArrow?: boolean;
  placement?:
  | "top"
  | "top-center"
  | "top-start"
  | "top-end"
  | "bottom-center"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left-center"
  | "left"
  | "left-start"
  | "left-end"
  | "right-center"
  | "right"
  | "right-start"
  | "right-end";
  showDelay?: string | number;
  hideDelay?: string | number;
  defaultOpen?: boolean;
  boundariesElement?: string;
  openAriaLabel?: string;
  closeAriaLabel?: string;
};

const DEFAULT_POPPER_MODIFIERS = {
  preventOverflow: { enabled: true, padding: 8, boundariesElement: "viewport" },
};

const transformPropsToModifiers = ({ boundariesElement }) => ({
  ...DEFAULT_POPPER_MODIFIERS,
  boundariesElement,
});

const DropdownMenu: React.SFC<DropdownMenuProps> = React.forwardRef<DropdownMenuProps, Reference>(
  (
    {
      trigger = () => <IconicButton icon="more" />,
      children,
      showArrow = true,
      disabled,
      defaultOpen,
      backgroundColor = "whiteGrey",
      placement = "bottom-start",
      className,
      id,
      boundariesElement = "viewport",
      showDelay = "100",
      hideDelay = "200",
      openAriaLabel,
      closeAriaLabel,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const spaceProps = getSubset(props, propTypes.space);
    const restProps = omitSubset(props, propTypes.space);
    const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
      isOpen,
      placement: getLaagPlacement(placement),
      overflowContainer: false,
      auto: true,
      arrowOffset: 4,
      triggerOffset: 5,
      onOutsideClick: () => setIsOpen(false),
    });
    const handleOnClick = () => {
      if (isOpen) {
        conditionallyApplyDelay(() => setIsOpen(false), hideDelay);
      } else {
        conditionallyApplyDelay(() => setIsOpen(true), showDelay);
      }
    };

    HandleEsc(() => setIsOpen(false));

    const dropdownTrigger = React.cloneElement(trigger(), {
      type: "button",
      disabled: disabled ? true : null,
      "aria-haspopup": true,
      onClick: handleOnClick,
      onBlur: () => setIsOpen(false),
      onFocus: () => setIsOpen(true),
      "aria-label": isOpen ? closeAriaLabel : openAriaLabel,
      ...spaceProps,
      ...triggerProps,
    });

    const { colors } = useTheme();
    return (
      <>
        {dropdownTrigger}
        {renderLayer(
          <AnimatePresence>
            {isOpen && (
              // dropdown container styles, role, class
              <DropdownMenuContainer
                backgroundColor={backgroundColor}
                borderColor={backgroundColor}
                className={`tooltip-box ${className}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.1 }}
                role="tooltip"
                id={id}
                {...restProps}
                {...layerProps}
              >
                {children}
                {showArrow && (
                  <Arrow
                    {...arrowProps}
                    borderWidth={1}
                    borderColor={colors[backgroundColor]}
                    backgroundColor={colors[backgroundColor]}
                    size={8}
                  />
                )}
              </DropdownMenuContainer>
            )}
          </AnimatePresence>
        )}
      </>
    );
  }
);

export default DropdownMenu;

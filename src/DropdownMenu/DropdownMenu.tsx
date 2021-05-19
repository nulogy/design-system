// @ts-nocheck
import React, { useState } from "react";
import propTypes from "@styled-system/prop-types";
import { useTheme } from "styled-components";
import { useLayer, Arrow } from "react-laag";
import { AnimatePresence } from "framer-motion";
import { IconicButton } from "../Button";
import { getSubset, omitSubset } from "../utils/subset";
import HandleEsc from "../utils/HandleEsc";
import getLaagPlacement from "../utils/getReactLaagPlacement";
import DropdownMenuContainer from "./DropdownMenuContainer";

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
  defaultOpen?: boolean;
  overflowContainer?: boolean;
  openAriaLabel?: string;
  closeAriaLabel?: string;
};
const DropdownMenu: React.SFC<DropdownMenuProps> = ({
  trigger,
  children,
  showArrow,
  disabled,
  defaultOpen,
  backgroundColor,
  placement,
  className,
  id,
  overflowContainer,
  openAriaLabel,
  closeAriaLabel,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const spaceProps = getSubset(props, propTypes.space);
  const restProps = omitSubset(props, propTypes.space);
  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    overflowContainer,
    placement: getLaagPlacement(placement),
    overflowContainer: false,
    auto: true,
    arrowOffset: 4,
    triggerOffset: 5,
    onOutsideClick: () => setIsOpen(false),
  });
  const handleOnClick = () => {
    setIsOpen(!isOpen);
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
            <DropdownMenuContainer
              backgroundColor={backgroundColor}
              borderColor={backgroundColor}
              className={`nds-dropdown-menu ${className}`}
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
};
DropdownMenu.defaultProps = {
  disabled: false,
  className: undefined,
  id: undefined,
  trigger: () => <IconicButton icon="more" />,
  backgroundColor: "whiteGrey",
  showArrow: true,
  placement: "bottom-start",
  defaultOpen: false,
  overlflowContainer: true,
  openAriaLabel: undefined,
  closeAriaLabel: undefined,
};
export default DropdownMenu;

// @ts-nocheck
import React from "react";
import DropdownMenuContainer from "./DropdownMenuContainer";
import { IconicButton } from "../Button";
import { Popper } from "../Popper";
import propTypes from "@styled-system/prop-types";
import { getSubset, omitSubset } from "../utils/subset";
const DEFAULT_POPPER_MODIFIERS = {
  preventOverflow: { enabled: true, padding: 8, boundariesElement: "viewport" },
};
const transformPropsToModifiers = ({ boundariesElement }) => ({
  ...DEFAULT_POPPER_MODIFIERS,
  boundariesElement,
});
type DropdownMenuProps = {
  className?: string;
  id?: string;
  disabled?: boolean;
  trigger?: React.ReactNode | ((...args: any[]) => any);
  backgroundColor?: string;
  showArrow?: boolean;
  placement?:
    | "top"
    | "top-start"
    | "top-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "left"
    | "left-start"
    | "left-end"
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
const DropdownMenu: React.SFC<DropdownMenuProps> = React.forwardRef(
  (
    {
      trigger,
      children,
      showArrow,
      disabled,
      defaultOpen,
      backgroundColor,
      placement,
      className,
      id,
      boundariesElement,
      showDelay,
      hideDelay,
      openAriaLabel,
      closeAriaLabel,
      ...props
    },
    ref
  ) => {
    const spaceProps = getSubset(props, propTypes.space);
    const restProps = omitSubset(props, propTypes.space);
    return (
      <Popper
        trigger={React.cloneElement(trigger(), {
          type: "button",
          disabled: disabled ? true : null,
          "aria-haspopup": true,
          ...spaceProps,
        })}
        showDelay={showDelay}
        hideDelay={hideDelay}
        placement={placement}
        defaultOpen={defaultOpen}
        showArrow={showArrow}
        openOnClick
        ref={ref}
        openOnHover={false}
        modifiers={transformPropsToModifiers({ boundariesElement })}
        backgroundColor={backgroundColor}
        borderColor={backgroundColor}
        openAriaLabel={openAriaLabel}
        closeAriaLabel={closeAriaLabel}
      >
        <DropdownMenuContainer
          className={className}
          id={id}
          backgroundColor={backgroundColor}
          showArrow={showArrow}
          {...restProps}
        >
          {children}
        </DropdownMenuContainer>
      </Popper>
    );
  }
);
DropdownMenu.defaultProps = {
  disabled: false,
  className: undefined,
  id: undefined,
  trigger: () => <IconicButton icon="more" />,
  backgroundColor: "whiteGrey",
  showArrow: true,
  placement: "bottom-start",
  showDelay: "100",
  hideDelay: "200",
  defaultOpen: false,
  boundariesElement: "viewport",
  openAriaLabel: undefined,
  closeAriaLabel: undefined,
};
export default DropdownMenu;

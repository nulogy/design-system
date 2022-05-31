// @ts-nocheck
import React, { useMemo } from "react";
import DropdownMenuContainer from "./DropdownMenuContainer";
import { IconicButton } from "../Button";
import { Popper } from "../Popper";
import propTypes from "@styled-system/prop-types";
import { getSubset, omitSubset } from "../utils/subset";
import { Reference } from "react-popper";

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

const DEFAULT_POPPER_MODIFIERS = {
  preventOverflow: { enabled: true, padding: 8, boundariesElement: "viewport" },
};

const transformPropsToModifiers = ({ boundariesElement }) => ({
  ...DEFAULT_POPPER_MODIFIERS,
  boundariesElement,
});

const DropdownMenu: React.FC<DropdownMenuProps> = React.forwardRef<
  DropdownMenuProps,
  Reference
>(
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
    const spaceProps = getSubset(props, propTypes.space);
    const restProps = omitSubset(props, propTypes.space);
    const modifiers = useMemo(() => {
      return transformPropsToModifiers({ boundariesElement });
    }, [boundariesElement]);

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
        popperPlacement={placement}
        defaultOpen={defaultOpen}
        showArrow={showArrow}
        openOnClick
        ref={ref}
        openOnHover={false}
        modifiers={modifiers}
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

export default DropdownMenu;

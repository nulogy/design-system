import React, { useMemo } from "react";
import propTypes from "@styled-system/prop-types";
import { IconicButton } from "../Button";
import { ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { Popper } from "../Popper";
import { getSubset, omitSubset } from "../utils/subset";
import { StyledProps } from "../StyledProps";
import DropdownMenuContainer from "./DropdownMenuContainer";

/*
 * These render props are defined in the `transformInnerChildren`
 * function in /src/Popper/Popper.tsx
 */
type DropdownMenuRenderProps = {
  closeMenu: (e: React.MouseEvent) => void;
  openMenu: (e: React.MouseEvent) => void;
};

interface DropdownMenuProps extends StyledProps {
  children?: React.ReactNode | ((props: DropdownMenuRenderProps) => React.ReactElement);
  variant?: ComponentVariant;
  id?: string;
  disabled?: boolean;
  trigger?: () => React.ReactElement;
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
  openOnHover?: boolean;
  className?: string;
}

const DEFAULT_POPPER_MODIFIERS = {
  preventOverflow: { enabled: true, padding: 8, boundariesElement: "viewport" },
};

const transformPropsToModifiers = ({ boundariesElement }) => ({
  ...DEFAULT_POPPER_MODIFIERS,
  boundariesElement,
});

const DropdownMenu = React.forwardRef<React.Ref<unknown>, DropdownMenuProps>(
  (
    {
      trigger = () => <IconicButton icon="more" />,
      children,
      showArrow = true,
      variant,
      disabled,
      defaultOpen,
      backgroundColor = "white",
      placement = "bottom-start",
      className,
      id,
      boundariesElement = "viewport",
      showDelay = "100",
      hideDelay = "200",
      openAriaLabel,
      closeAriaLabel,
      openOnHover = false,
      ...props
    },
    ref
  ) => {
    const spaceProps = getSubset(props, propTypes.space);
    const restProps = omitSubset(props, propTypes.space);
    const modifiers = useMemo(() => {
      return transformPropsToModifiers({ boundariesElement });
    }, [boundariesElement]);

    const componentVariant = useComponentVariant(variant);

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
        openOnClick={!openOnHover}
        ref={ref}
        openOnHover={openOnHover}
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
          {typeof children === "function"
            ? children
            : React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child, { size: componentVariant, ...child.props }, child.props.children);
                }
              })}
        </DropdownMenuContainer>
      </Popper>
    );
  }
);

export default DropdownMenu;

import React from "react";
import PropTypes from "prop-types";
// import { Manager, Reference, Popper } from "react-popper";
import { DetectOutsideClick, withMenuState } from "../utils";
import { IconicButton } from "../Button";
import DropdownMenuContainer from "./DropdownMenuContainer";
import { deprecatedProp } from "../utils/deprecatedProp";
import { Popper } from "../Popper";

const DEFAULT_POPPER_MODIFIERS = {
  preventOverflow: { enabled: true, padding: 8, boundariesElement: "viewport" }
};

const transformPropsToModifiers = ({ boundariesElement }) => ({
  ...DEFAULT_POPPER_MODIFIERS,
  boundariesElement
});

const DropdownMenu = React.forwardRef(
  (
    { trigger, children, disabled, backgroundColor, placement, modifiers, showArrow, className, id, boundariesElement },
    ref
  ) => (
    <Popper
      trigger={trigger()}
      popperPlacement={placement}
      defaultOpen
      openOnClick
      ref={ref}
      openOnHover={false}
      backgroundColor={backgroundColor}
      borderColor={backgroundColor}
      // showArrow={showArrow}
    >
      <DropdownMenuContainer
        className={className}
        id={id}
        // style={style}
        backgroundColor={backgroundColor}
        showArrow={showArrow}
      >
        {children}
      </DropdownMenuContainer>
    </Popper>
  )
);
DropdownMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  backgroundColor: PropTypes.string,
  showArrow: PropTypes.bool,
  placement: PropTypes.oneOf([
    "top",
    "top-start",
    "top-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
    "right",
    "right-start",
    "right-end"
  ]),
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultOpen: PropTypes.bool,
  modifiers: deprecatedProp(PropTypes.shape({}), "boundariesElement"),
  boundariesElement: PropTypes.string
};

DropdownMenu.defaultProps = {
  disabled: false,
  className: undefined,
  id: undefined,
  trigger: () => <IconicButton icon="more" />,
  backgroundColor: undefined,
  showArrow: true,
  placement: "bottom-start",
  showDelay: "100",
  hideDelay: "200",
  defaultOpen: false,
  modifiers: undefined,
  boundariesElement: "viewport"
};

export default DropdownMenu;

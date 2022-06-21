import styled, {
  CSSObject,
  StyledComponentPropsWithRef,
} from "styled-components";
import React from "react";
import { DropdownButton } from "../DropdownMenu";
import { Icon } from "../Icon";

const StyledButton: StyledComponentPropsWithRef<any> = styled(DropdownButton)(
  ({ isOpen, theme }: any): CSSObject => ({
    position: "relative",
    backgroundColor: isOpen ? theme.colors.lightBlue : "transparent",
    color: isOpen ? theme.colors.darkBlue : theme.colors.darkGrey,
  })
);
type SubMenuTriggerButtonProps = React.ComponentPropsWithRef<"button"> & {
  name?: string;
  isOpen: boolean;
};

const SubMenuTriggerButton = React.forwardRef<
  HTMLButtonElement,
  SubMenuTriggerButtonProps
>(({ name, isOpen, ...props }, ref) => (
  <StyledButton isOpen={isOpen} ref={ref} {...props}>
    {name}
    <Icon
      style={{ position: "absolute", top: "10px" }}
      icon="rightArrow"
      size="20px"
      p="2px"
    />
  </StyledButton>
));

SubMenuTriggerButton.displayName = "SubMenuTriggerButton";

export default SubMenuTriggerButton;

import styled, { CSSObject } from "styled-components";
import React from "react";
import { DropdownButton } from "../DropdownMenu";
import { Icon } from "../Icon";
import { Flex } from "../Flex";

const StyledButton = styled(DropdownButton)<{ isOpen: boolean }>(
  ({ isOpen, theme }): CSSObject => ({
    padding: `${theme.space.x1} ${theme.space.x1} ${theme.space.x1} 12px`,
    backgroundColor: isOpen ? theme.colors.lightBlue : "transparent",
    color: isOpen ? theme.colors.darkBlue : theme.colors.darkGrey,
  })
);

type SubMenuTriggerButtonProps = React.ComponentPropsWithRef<"button"> & {
  name?: string;
  isOpen: boolean;
};

const SubMenuTriggerButton = React.forwardRef<HTMLButtonElement, SubMenuTriggerButtonProps>(
  ({ name, isOpen, ...props }, ref) => {
    return (
      <StyledButton isOpen={isOpen} ref={ref} {...props}>
        <Flex gap="half" justifyContent="space-between" alignItems="center">
          {name}
          <Icon icon="rightArrow" size="20px" />
        </Flex>
      </StyledButton>
    );
  }
);

SubMenuTriggerButton.displayName = "SubMenuTriggerButton";

export default SubMenuTriggerButton;

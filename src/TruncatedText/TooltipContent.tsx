import React from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import styled, { keyframes } from "styled-components";

const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideRightAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideDownAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideLeftAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const StyledContent = styled(RadixTooltip.Content)`
  font-family: ${({ theme }) => theme.fonts.base};
  border-radius: ${({ theme }) => theme.radii.medium};
  padding: ${({ theme }) => theme.space.x1};
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  z-index: ${({ theme }) => theme.zIndices.content};
  line-height: 1;
  user-select: none;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-state="delayed-open"][data-side="top"] {
    animation-name: ${slideUpAndFade};
  }
  &[data-state="delayed-open"][data-side="right"] {
    animation-name: ${slideRightAndFade};
  }
  &[data-state="delayed-open"][data-side="bottom"] {
    animation-name: ${slideDownAndFade};
  }
  &[data-state="delayed-open"][data-side="left"] {
    animation-name: ${slideLeftAndFade};
  }
`;

const StyledArrow = styled(RadixTooltip.Arrow)(({ theme }) => ({
  fill: theme.colors.white,
  filter: `drop-shadow(0px 1px 0px ${theme.colors.grey})`,
  clipPath: "inset(0 -10px -10px -10px)",
}));

type StyledTooltipContentProps = React.ComponentProps<typeof RadixTooltip.Content> & {
  children: React.ReactNode;
};

const StyledTooltipContent = ({ children, ...props }: StyledTooltipContentProps) => (
  <StyledContent sideOffset={4} {...props}>
    <StyledArrow />
    {children}
  </StyledContent>
);

export default StyledTooltipContent;

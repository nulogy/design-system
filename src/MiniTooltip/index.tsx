import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import styled, { keyframes } from "styled-components";
import { transparentize } from "polished";
import React, { ReactNode } from "react";

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  hideTooltip?: boolean;
  sideOffset?: number;
  delayDuration?: number;
};

export function MiniTooltip({
  children,
  content,
  sideOffset = 4,
  hideTooltip = false,
  delayDuration = 700,
}: TooltipProps) {
  if (hideTooltip) {
    return <>{children}</>;
  }

  return (
    <TooltipPrimitive.Provider delayDuration={delayDuration}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipContent sideOffset={sideOffset}>{content}</TooltipContent>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

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

const TooltipContent = styled(TooltipPrimitive.Content)`
  font-family: ${({ theme }) => theme.fonts.base};
  white-space: nowrap;
  font-size: ${({ theme }) => theme.fontSizes.smaller};
  line-height: ${({ theme }) => theme.lineHeights.smallerText};
  color: ${({ theme }) => theme.colors.whiteGrey};
  background-color: ${({ theme }) => transparentize(0.05, theme.colors.blackBlue)};
  border-radius: ${({ theme }) => theme.radii.medium};
  margin-top: ${({ theme }) => theme.space.half};
  padding: ${({ theme }) => `${theme.space.x0_25} ${theme.space.x0_75}`};
  z-index: ${({ theme }) => theme.zIndices.aboveOverlay};
  pointer-events: none;
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

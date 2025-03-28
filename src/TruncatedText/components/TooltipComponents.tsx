import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import styled, { keyframes, useTheme } from "styled-components";
import { maxWidth } from "styled-system";
import { MaxWidthProps } from "styled-system";

// A helper hook to determine if the device supports hover
function useHasHover() {
  try {
    return matchMedia("(hover: hover)").matches;
  } catch {
    // Assume that if the browser is too old to support matchMedia, it's likely not a touch device
    return true;
  }
}

type TooltipTriggerContextType = {
  supportMobileTap: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TooltipTriggerContext = React.createContext<TooltipTriggerContextType>({
  supportMobileTap: false,
  open: false,
  setOpen: () => {},
});

const TooltipProvider = TooltipPrimitive.Provider;

type TooltipProps = TooltipPrimitive.TooltipProps & {
  supportMobileTap?: boolean;
};

function Tooltip({ children, ...props }: TooltipProps) {
  const [open, setOpen] = React.useState<boolean>(props.defaultOpen ?? false);
  const hasHover = useHasHover();

  return (
    <TooltipPrimitive.Root
      delayDuration={!hasHover && props.supportMobileTap ? 0 : props.delayDuration}
      onOpenChange={setOpen}
      open={open}
    >
      <TooltipTriggerContext.Provider
        value={{
          open,
          setOpen,
          supportMobileTap: props.supportMobileTap ?? false,
        }}
      >
        {children}
      </TooltipTriggerContext.Provider>
    </TooltipPrimitive.Root>
  );
}

Tooltip.displayName = TooltipPrimitive.Root.displayName;

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ children, ...props }, ref) => {
  const hasHover = useHasHover();
  const { setOpen, supportMobileTap } = React.useContext(TooltipTriggerContext);

  const { onClick: onClickProp } = props;

  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!hasHover && supportMobileTap) {
        e.preventDefault();
        setOpen(true);
      } else {
        onClickProp?.(e);
      }
    },
    [setOpen, hasHover, supportMobileTap, onClickProp]
  );

  return (
    <TooltipPrimitive.Trigger ref={ref} {...props} onClick={onClick}>
      {children}
    </TooltipPrimitive.Trigger>
  );
});

TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

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

const StyledContent = styled(TooltipPrimitive.Content)`
  font-family: ${({ theme }) => theme.fonts.base};
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: ${({ theme }) => theme.lineHeights.smallTextBase};
  border-radius: ${({ theme }) => theme.radii.medium};
  padding: ${({ theme }) => theme.space.x1};
  color: ${({ theme }) => theme.colors.black};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  box-shadow: ${({ theme }) => theme.shadows.medium};
  z-index: ${({ theme }) => theme.zIndices.aboveOverlay};
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-state="delayed-open"][data-side="top"] {
    animation-name: ${slideDownAndFade};
  }
  &[data-state="delayed-open"][data-side="right"] {
    animation-name: ${slideLeftAndFade};
  }
  &[data-state="delayed-open"][data-side="bottom"] {
    animation-name: ${slideUpAndFade};
  }
  &[data-state="delayed-open"][data-side="left"] {
    animation-name: ${slideRightAndFade};
  }
  ${maxWidth}
`;

const StyledArrow = styled(TooltipPrimitive.Arrow)(({ theme }) => ({
  fill: theme.colors.white,
  filter: `drop-shadow(0px 1px 0px ${theme.colors.grey})`,
}));

interface StyledTooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    MaxWidthProps {
  children?: React.ReactNode;
}

const TooltipContent = React.forwardRef<React.ElementRef<typeof TooltipPrimitive.Content>, StyledTooltipContentProps>(
  ({ sideOffset = 4, children, ...props }, ref) => {
    const theme = useTheme();
    return (
      <StyledContent ref={ref} sideOffset={sideOffset} {...props}>
        {children}
        <StyledArrow width={theme.space.x1_5} height={theme.space.x0_75} />
      </StyledContent>
    );
  }
);

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };

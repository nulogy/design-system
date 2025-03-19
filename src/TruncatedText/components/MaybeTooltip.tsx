import React, { PropsWithChildren } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { MaxWidthProps } from "styled-system";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./TooltipComponents";

export type MaybeTooltipProps = PropsWithChildren<{
  tooltip: React.ReactNode;
  showTooltip?: boolean;
  placement?: "top" | "bottom" | "left" | "right";
  className?: string;
  defaultOpen?: boolean;
  showDelay?: number;
  maxWidth?: MaxWidthProps["maxWidth"];
  supportMobileTap?: boolean;
}>;

const MaybeTooltip: React.FC<MaybeTooltipProps> = ({
  tooltip,
  children,
  placement = "bottom",
  defaultOpen = false,
  showDelay = 100,
  maxWidth = "24em",
  showTooltip = true,
  supportMobileTap = true,
  className,
}) => {
  if (!showTooltip) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <Tooltip defaultOpen={defaultOpen} delayDuration={showDelay} supportMobileTap={supportMobileTap}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPrimitive.Portal>
          <TooltipContent side={placement} className={className} maxWidth={maxWidth}>
            {tooltip}
          </TooltipContent>
        </TooltipPrimitive.Portal>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MaybeTooltip;

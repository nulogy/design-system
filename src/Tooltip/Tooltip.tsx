import React from "react";
import { MaxWidthProps } from "styled-system";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import {
  Tooltip as BaseTooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./components/TooltipComponents";
import { getPlacementProps } from "./helpers";

export type TooltipProps = {
  /** Delay before showing (in ms) */
  showDelay?: string | number;
  /** Whether the tooltip is open by default */
  defaultOpen?: boolean;
  /** Tooltip placement relative to the trigger */
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
  /** Maximum width for the tooltip box */
  maxWidth?: MaxWidthProps["maxWidth"];
  /** Additional CSS class for styling */
  className?: string;
  /** The content to display inside the tooltip */
  tooltip?: React.ReactNode;
  /** Child element that triggers the tooltip */
  children?: React.ReactNode;
};

export default function Tooltip({
  showDelay = "100",
  defaultOpen = false,
  placement = "bottom",
  maxWidth = "24em",
  className,
  tooltip,
  children,
}: TooltipProps) {
  const delayDuration = typeof showDelay === "string" ? parseInt(showDelay, 10) : showDelay;
  const { side, align } = getPlacementProps(placement);

  return (
    <TooltipProvider>
      <BaseTooltip defaultOpen={defaultOpen} delayDuration={delayDuration} supportMobileTap={true}>
        <TooltipTrigger asChild data-testid="nds-tooltip-trigger">
          {children}
        </TooltipTrigger>
        <TooltipPrimitive.Portal>
          <TooltipContent side={side} align={align} className={className} maxWidth={maxWidth}>
            {tooltip}
          </TooltipContent>
        </TooltipPrimitive.Portal>
      </BaseTooltip>
    </TooltipProvider>
  );
}

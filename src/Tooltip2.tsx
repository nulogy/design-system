import React, { PropsWithChildren } from "react";
import { MaxWidthProps } from "styled-system";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import {
  Tooltip as BaseTooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "./TruncatedText/components/TooltipComponents";

export type Tooltip2Props = PropsWithChildren<{
  /** The content to display inside the tooltip */
  content: React.ReactNode;
  /** Whether to show the tooltip at all */
  show?: boolean;
  /** Tooltip placement relative to the trigger */
  placement?: "top" | "bottom" | "left" | "right";
  /** Whether the tooltip is open by default */
  defaultOpen?: boolean;
  /** Delay before showing (in ms) */
  delayDuration?: number;
  /** Enable opening on mobile tap */
  supportMobileTap?: boolean;
  /** Additional CSS class for styling */
  className?: string;
  /** Maximum width for the tooltip box */
  maxWidth?: MaxWidthProps["maxWidth"];
}>;

function Tooltip2({
  content,
  children,
  placement = "bottom",
  defaultOpen = false,
  delayDuration = 100,
  maxWidth = "24em",
  show = true,
  supportMobileTap = true,
  className,
}: Tooltip2Props) {
  if (!show) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider>
      <BaseTooltip
        defaultOpen={defaultOpen}
        delayDuration={delayDuration}
        supportMobileTap={supportMobileTap}
      >
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPrimitive.Portal>
          <TooltipContent
            side={placement}
            className={className}
            maxWidth={maxWidth}
          >
            {content}
          </TooltipContent>
        </TooltipPrimitive.Portal>
      </BaseTooltip>
    </TooltipProvider>
  );
}

export default Tooltip2;
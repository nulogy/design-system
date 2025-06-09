import React from "react";
import { MaxWidthProps } from "styled-system";
import Tooltip2 from "../../Tooltip2";

export type MaybeTooltipProps = {
  /** The content to display inside the tooltip */
  tooltip: React.ReactNode;
  /** Whether to enable the tooltip at all */
  showTooltip?: boolean;
  /** Tooltip placement relative to trigger element */
  placement?: "top" | "bottom" | "left" | "right";
  /** CSS class for the tooltip content */
  className?: string;
  /** Whether tooltip is open by default */
  defaultOpen?: boolean;
  /** Delay before showing the tooltip (ms) */
  showDelay?: number;
  /** Maximum width for tooltip box */
  maxWidth?: MaxWidthProps["maxWidth"];
  /** Allow opening tooltip on mobile tap */
  supportMobileTap?: boolean;
  /** The trigger element(s) */
  children?: React.ReactNode;
};

function MaybeTooltip({
  tooltip,
  showTooltip = true,
  placement = "bottom",
  defaultOpen = false,
  showDelay = 100,
  maxWidth = "24em",
  supportMobileTap = true,
  className,
  children,
}: MaybeTooltipProps) {
  return (
    <Tooltip2
      content={tooltip}
      show={showTooltip}
      placement={placement}
      defaultOpen={defaultOpen}
      delayDuration={showDelay}
      maxWidth={maxWidth}
      supportMobileTap={supportMobileTap}
      className={className}
    >
      {children}
    </Tooltip2>
  );
}

export default MaybeTooltip;
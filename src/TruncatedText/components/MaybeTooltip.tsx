import React from "react";
import { Tooltip } from "../..";

export type MaybeTooltipProps = {
  /** The content to display inside the tooltip */
  tooltip: React.ReactNode;
  /** Whether to enable the tooltip at all */
  showTooltip?: boolean;
  /** Tooltip placement relative to trigger element */
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
  /** CSS class for the tooltip content */
  className?: string;
  /** Whether tooltip is open by default */
  defaultOpen?: boolean;
  /** Delay before showing the tooltip (ms) */
  showDelay?: number;
  /** Maximum width for tooltip box */
  maxWidth?: string;
  /** Allow opening tooltip on mobile tap (not supported by new Tooltip) */
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
  supportMobileTap: _supportMobileTap = true, // Note: supportMobileTap is handled internally by the new Tooltip
  className,
  children,
}: MaybeTooltipProps) {
  if (!showTooltip) {
    return <>{children}</>;
  }

  return (
    <Tooltip
      tooltip={tooltip}
      placement={placement}
      defaultOpen={defaultOpen}
      showDelay={showDelay}
      maxWidth={maxWidth}
      className={className}
    >
      {children}
    </Tooltip>
  );
}

export default MaybeTooltip;

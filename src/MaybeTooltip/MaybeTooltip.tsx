import React from "react";
import { TooltipProps } from "../Tooltip/Tooltip";
import { Tooltip } from "../Tooltip";

export interface MaybeTooltipProps extends TooltipProps {
  /** Whether to enable the tooltip at all */
  showTooltip?: boolean;
  /** Allow opening tooltip on mobile tap (not supported by new Tooltip) */
  supportMobileTap?: boolean;
}

/**
 * Conditionally displays a tooltip.
 */
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

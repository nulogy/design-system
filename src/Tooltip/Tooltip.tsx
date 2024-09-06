import React from "react";
import { Popper } from "../Popper";
import { generateId } from "../utils";
import TooltipContainer from "./TooltipContainer";

export type TooltipProps = {
  showDelay?: string | number;
  hideDelay?: string | number;
  defaultOpen?: boolean;
  className?: string;
  tooltip?: React.ReactNode;
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
  maxWidth?: string;
  children?: React.ReactNode;
};

const Tooltip = React.forwardRef<any, TooltipProps>(
  (
    {
      showDelay = "100",
      hideDelay = "350",
      defaultOpen = false,
      placement = "bottom",
      maxWidth = "24em",
      className,
      tooltip,
      children,
    },
    ref
  ) => (
    <Popper
      ref={ref}
      popperPlacement={placement}
      defaultOpen={defaultOpen}
      showDelay={showDelay}
      hideDelay={hideDelay}
      trigger={children}
      id={generateId()}
    >
      <TooltipContainer className={className} maxWidth={maxWidth} role="tooltip">
        {tooltip}
      </TooltipContainer>
    </Popper>
  )
);

export default Tooltip;

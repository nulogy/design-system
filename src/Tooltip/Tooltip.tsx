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

const Tooltip: React.SFC<TooltipProps> = React.forwardRef(
  (
    {
      className,
      tooltip,
      maxWidth,
      children,
      placement,
      showDelay,
      hideDelay,
      defaultOpen,
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
      <TooltipContainer
        className={className}
        maxWidth={maxWidth}
        role="tooltip"
      >
        {tooltip}
      </TooltipContainer>
    </Popper>
  )
);

Tooltip.defaultProps = {
  showDelay: "100",
  hideDelay: "350",
  defaultOpen: false,
  className: undefined,
  placement: "bottom",
  maxWidth: "24em",
};

export default Tooltip;

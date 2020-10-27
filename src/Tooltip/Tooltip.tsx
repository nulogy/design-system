import React from "react";
import styled, { CSSObject } from "styled-components";
import { Box } from "../Box";
import { Popper } from "../Popper";
import { generateId } from "../utils";
import { ThemeType } from "../theme.type";
import { PositionProps } from "styled-system";
const tooltipStyles = (theme) => ({
  backgroundColor: theme.colors.white,
  borderColor: theme.colors.grey,
  textColor: theme.colors.black,
});
const getTooltipMargin = (placement) => {
  const direction = String(placement).split("-")[0];
  switch (direction) {
    case "top":
      return {
        marginBottom: "4px",
      };
    case "right":
      return {
        marginLeft: "4px",
      };
    case "left":
      return {
        marginRight: "4px",
      };
    case "bottom":
    default:
      return {
        marginTop: "4px",
      };
  }
};

type TooltipContainerProps = PositionProps & {
  theme?: ThemeType;
  dataPlacement?: "top" | "bottom" | "left" | "right";
  open?: boolean;
  position?:
    | "-moz-initial"
    | "inherit"
    | "initial"
    | "revert"
    | "unset"
    | "-webkit-sticky"
    | "absolute"
    | "fixed"
    | "relative"
    | "static"
    | "sticky";
};
const TooltipContainer = styled(Box)(
  ({ theme, dataPlacement, open, position }: TooltipContainerProps): any => ({
    color: tooltipStyles(theme).textColor,
    display: "flex",
    flexDirection: "column",
    fontSize: theme.fontSizes.small,
    backgroundColor: tooltipStyles(theme).backgroundColor,
    borderRadius: theme.radii.medium,
    border: `1px solid ${tooltipStyles(theme).borderColor}`,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.18)",
    padding: theme.space.x1,
    transition: "opacity 0.3s",
    zIndex: theme.zIndex.content,
    ...getTooltipMargin(dataPlacement),
    position,
    top: open ? 0 : "-9999px",
  })
);
type TooltipProps = {
  showDelay?: string | number;
  hideDelay?: string | number;
  defaultOpen?: boolean;
  className?: string;
  tooltip: React.ReactNode;
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

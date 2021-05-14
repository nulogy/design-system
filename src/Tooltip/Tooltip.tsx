// @ts-nocheck
import React from "react";
import styled from "styled-components";
import { useLayer, Arrow } from "react-laag";
import { AnimatePresence } from "framer-motion";
import { PositionProps } from "styled-system";
import { Box } from "../Box";
import { DefaultNDSThemeType } from "../theme.type";
import { AnimatedBox } from "../Box/Box";

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
  theme?: DefaultNDSThemeType;
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
const Tooltip = React.forwardRef(
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
    }: TooltipContainerProps,
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
      isOpen,
      arrowOffset: 4,
    });
    const trigger = React.cloneElement(children, {
      ...triggerProps,
      onClick: () => setIsOpen(!isOpen),
    });
    return <>
      {trigger}
      {renderLayer(
        <AnimatePresence>
          {isOpen && (
            <AnimatedBox
              fontFamily="IBM Plex Sans"
              display="flex"
              flexDirection="column"
              fontSize="small"
              borderRadius="medium"
              border="1px solid #c0c8d1"
              boxShadow="small"
              padding="x1"
              className="tooltip-box"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              {...layerProps}
            >
              {tooltip}
              <Arrow
                {...arrowProps}
                borderWidth={1}
                borderColor="#c0c8d1"
                size={6}
              />
            </AnimatedBox>
          )}
        </AnimatePresence>
      )}
    </>
  }
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

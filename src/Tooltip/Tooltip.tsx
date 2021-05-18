// @ts-nocheck
import React, { useState } from "react";
import { useTheme } from "styled-components";
import { useLayer, Arrow } from "react-laag";
import { AnimatePresence } from "framer-motion";
import { PositionProps } from "styled-system";
import { generateId } from "../utils";
import { DefaultNDSThemeType } from "../theme.type";
import { AnimatedBox } from "../Box/Box";

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
  | "top-center"
  | "top-start"
  | "top-end"
  | "bottom-center"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left-center"
  | "left"
  | "left-start"
  | "left-end"
  | "right-center"
  | "right"
  | "right-start"
  | "right-end";
  maxWidth?: string;
  children?: React.ReactNode;
};

const getLaagPlacement = (placement) => {
  return placement.includes("-") ? placement : `${placement}-center`;
};

const conditionallyApplyDelay = (fnc, delay) => {
  if (delay) {
    timeoutID = setTimeout(fnc, Number(delay));
  } else {
    fnc();
  }
};

const Tooltip: React.FC<TooltipContainerProps> = ({
  className,
  tooltip,
  maxWidth = "24em",
  children,
  placement = "bottom",
  showDelay = "100",
  hideDelay = "350",
  defaultOpen,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    placement: getLaagPlacement(placement),
    overflowContainer: false,
    auto: true,
    arrowOffset: 4,
    triggerOffset: 5,
  });
  const { colors } = useTheme();
  const id = generateId();
  const trigger = React.cloneElement(children, {
    "aria-haspopup": true,
    "aria-describedby": id,
    onMouseEnter: () =>
      conditionallyApplyDelay(() => setIsOpen(true), showDelay),
    onMouseLeave: () =>
      conditionallyApplyDelay(() => setIsOpen(false), hideDelay),
    onBlur: () => setIsOpen(false),
    onFocus: () => setIsOpen(true),
    ...triggerProps,
  });
  return (
    <>
      {trigger}
      {renderLayer(
        <AnimatePresence>
          {isOpen && (
            <AnimatedBox
              fontFamily="base"
              display="flex"
              flexDirection="column"
              fontSize="small"
              borderRadius="medium"
              border="1px solid"
              borderColor="grey"
              color="black"
              backgroundColor="white"
              boxShadow="small"
              padding="x1"
              className={`tooltip-box ${className}`}
              maxWidth={maxWidth}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              role="tooltip"
              id={id}
              {...layerProps}
            >
              {tooltip}
              <Arrow
                {...arrowProps}
                borderWidth={1}
                borderColor={colors.grey}
                backgroundColor={colors.white}
                size={6}
              />
            </AnimatedBox>
          )}
        </AnimatePresence>
      )}
    </>
  );
};

export default Tooltip;

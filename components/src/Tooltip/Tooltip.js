import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Box } from "../Box";
import theme from "../theme";
import { Popper } from "../Popper";

const tooltipStyles = {
  backgroundColor: theme.colors.white,
  borderColor: theme.colors.grey,
  textColor: theme.colors.black
};

const getTooltipMargin = placement => {
  const direction = String(placement).split("-")[0];
  switch (direction) {
    case "top":
      return {
        marginBottom: "4px"
      };
    case "right":
      return {
        marginLeft: "4px"
      };
    case "left":
      return {
        marginRight: "4px"
      };
    case "bottom":
    default:
      return {
        marginTop: "4px"
      };
  }
};

const TooltipContainer = styled(Box)(
  {
    color: tooltipStyles.textColor,
    display: "flex",
    flexDirection: "column",
    fontSize: theme.fontSizes.small,
    backgroundColor: tooltipStyles.backgroundColor,
    borderRadius: theme.radii.medium,
    border: `1px solid ${tooltipStyles.borderColor}`,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.18)",
    padding: theme.space.x1,
    transition: "opacity 0.3s",
    zIndex: theme.zIndex.content
  },
  ({ dataPlacement, open, position }) => ({
    ...getTooltipMargin(dataPlacement),
    ...position,
    top: open ? 0 : "-9999px",
    "aria-hidden": !open
  })
);

const Tooltip = ({ className, tooltip, maxWidth, children, id, placement, showDelay, hideDelay, defaultOpen }) => (
  <Popper
    popperPlacement={placement}
    defaultOpen={defaultOpen}
    showDelay={showDelay}
    hideDelay={hideDelay}
    trigger={children}
  >
    <TooltipContainer className={className} maxWidth={maxWidth} role="tooltip">
      {tooltip}
    </TooltipContainer>
  </Popper>
);

Tooltip.propTypes = {
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultOpen: PropTypes.bool,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  // id: PropTypes.string.isRequired,
  tooltip: PropTypes.node.isRequired,
  menuState: PropTypes.shape({
    isOpen: PropTypes.bool,
    openMenu: PropTypes.func,
    closeMenu: PropTypes.func
  }).isRequired,
  placement: PropTypes.oneOf([
    "top",
    "top-start",
    "top-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
    "right",
    "right-start",
    "right-end"
  ]),
  maxWidth: PropTypes.string
};

Tooltip.defaultProps = {
  showDelay: "100",
  hideDelay: "350",
  defaultOpen: false,
  className: undefined,
  placement: "bottom",
  maxWidth: "24em"
};

export default Tooltip;

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import { PopperArrow } from "../Utils";

const getThemeColor = color => (theme.colors[color] ? theme.colors[color] : color);

const getMenuMargin = (placement, renderArrow) => {
  const direction = String(placement).split("-")[0];
  switch (direction) {
    case "top":
      return {
        marginBottom: renderArrow ? "4px" : null
      };
    case "right":
      return {
        marginLeft: renderArrow ? "8px" : null,
        marginTop: renderArrow ? null : "-8px"
      };
    case "left":
      return {
        marginRight: renderArrow ? "8px" : null,
        marginTop: renderArrow ? null : "-8px"
      };
    case "bottom":
    default:
      return {
        marginTop: renderArrow ? "4px" : null
      };
  }
};

const BaseSubMenu = React.forwardRef(
  ({ popperProps: { style, placement, arrowProps }, renderArrow, children, backgroundColor, ...props }, ref) => (
    <div ref={ref} style={style} placement={placement} {...props}>
      {renderArrow && (
        <PopperArrow
          {...arrowProps}
          placement={placement}
          backgroundColor={backgroundColor}
          borderColor={backgroundColor}
        />
      )}
      {children}
    </div>
  )
);

BaseSubMenu.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  children: PropTypes.node,
  renderArrow: PropTypes.bool,
  popperProps: PropTypes.shape({})
};

BaseSubMenu.defaultProps = {
  children: null,
  renderArrow: true,
  popperProps: null
};

const DropdownMenu = styled(BaseSubMenu)(
  ({ placement, renderArrow, backgroundColor }) => ({
    backgroundColor: getThemeColor(backgroundColor),
    borderRadius: theme.radii.medium,
    borderTop: `1px solid ${getThemeColor(backgroundColor)}`,
    borderBottom: `1px solid ${getThemeColor(backgroundColor)}`,
    boxShadow: theme.shadows.small,
    padding: "7px 0",
    zIndex: "100",
    ...getMenuMargin(placement, renderArrow)
  }),
  ({ style }) => ({
    ...style
  })
);

DropdownMenu.propTypes = {
  backgroundColor: PropTypes.string,
  renderArrow: PropTypes.bool
};

DropdownMenu.defaultProps = {
  backgroundColor: "whiteGrey",
  renderArrow: true
};

export default DropdownMenu;

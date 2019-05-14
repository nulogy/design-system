import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";
import { PopperArrow } from "../Utils";

const getThemeColor = color => (theme.colors[color] ? theme.colors[color] : color);

const BaseSubMenu = React.forwardRef(
  ({ popperProps: { style, placement, arrowProps }, renderArrow, children, backgroundColor, ...props }, ref) => (
    <div ref={ref} style={style} placement={placement} {...props}>
      {renderArrow && <PopperArrow {...arrowProps} backgroundColor={backgroundColor} borderColor={backgroundColor} />}
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
  ({ renderArrow, backgroundColor }) => ({
    backgroundColor: getThemeColor(backgroundColor),
    borderRadius: theme.radii.medium,
    borderTop: `1px solid ${getThemeColor(backgroundColor)}`,
    borderBottom: `1px solid ${getThemeColor(backgroundColor)}`,
    boxShadow: theme.shadows.small,
    padding: "7px 0",
    transition: "opacity 0.3s",
    zIndex: "100",
    marginTop: renderArrow ? theme.space.half : "-8px"
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

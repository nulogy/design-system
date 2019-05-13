import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";

const getThemeColor = color => (theme.colors[color] ? theme.colors[color] : color);

const Arrow = styled.div(({ borderColor, backgroundColor }) => ({
  height: theme.space.x1,
  position: "absolute",
  width: theme.space.x1,
  margin: "12px",
  left: 0,
  top: 0,
  marginTop: "-7px",
  "&:before": {
    borderStyle: "solid",
    borderColor: `transparent transparent ${getThemeColor(borderColor)} transparent`,
    borderWidth: `0 ${theme.space.x1} ${theme.space.x1} ${theme.space.x1}`,
    content: "''",
    display: "block",
    height: 0,
    margin: "auto",
    position: "absolute",
    width: 0,
    top: "-2px",
    left: `-${theme.space.half}`
  },
  "&:after": {
    borderStyle: "solid",
    borderColor: `transparent transparent ${getThemeColor(backgroundColor)} transparent`,
    borderWidth: `0 ${theme.space.x1} ${theme.space.x1} ${theme.space.x1}`,
    content: "''",
    display: "block",
    height: 0,
    margin: "auto",
    position: "absolute",
    width: 0,
    left: `-${theme.space.half}`
  }
}));

const BaseSubMenu = React.forwardRef(
  (
    { popperProps: { style, placement, arrowProps }, renderArrow, children, borderColor, backgroundColor, ...props },
    ref
  ) => (
    <div ref={ref} style={style} placement={placement} {...props}>
      {renderArrow && <Arrow {...arrowProps} borderColor={borderColor} backgroundColor={backgroundColor} />}
      {children}
    </div>
  )
);

BaseSubMenu.propTypes = {
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
  ({ renderArrow, backgroundColor, borderColor }) => ({
    listStyle: "none",
    margin: "0",
    backgroundColor: getThemeColor(backgroundColor),
    borderRadius: theme.radii.medium,
    borderTop: `1px solid ${getThemeColor(borderColor)}`,
    borderBottom: `1px solid ${getThemeColor(borderColor)}`,
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
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  renderArrow: PropTypes.bool
};

DropdownMenu.defaultProps = {
  borderColor: "whiteGrey",
  backgroundColor: "whiteGrey",
  renderArrow: true
};

export default DropdownMenu;

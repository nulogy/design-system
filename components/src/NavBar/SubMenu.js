import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "../theme";

const subMenuStyles = {
  backgroundColor: theme.colors.whiteGrey,
  borderColor: theme.colors.whiteGrey,
  nameColor: theme.colors.black,
};

const Arrow = styled.div({
  height: theme.space.x1,
  position: "absolute",
  width: theme.space.x1,
  margin: "12px",
  left: 0,
  top: 0,
  marginTop: "-7px",
  "&:before": {
    borderStyle: "solid",
    borderColor: `transparent transparent ${subMenuStyles.borderColor} transparent`,
    borderWidth: `0 ${theme.space.x1} ${theme.space.x1} ${theme.space.x1}`,
    content: "''",
    display: "block",
    height: 0,
    margin: "auto",
    position: "absolute",
    width: 0,
    top: "-2px",
    left: `-${theme.space.half}`,
  },
  "&:after": {
    borderStyle: "solid",
    borderColor: `transparent transparent ${subMenuStyles.backgroundColor} transparent`,
    borderWidth: `0 ${theme.space.x1} ${theme.space.x1} ${theme.space.x1}`,
    content: "''",
    display: "block",
    height: 0,
    margin: "auto",
    position: "absolute",
    width: 0,
    left: `-${theme.space.half}`,
  },
});


const BaseSubMenu = ({
  popperProps: {
    ref,
    style,
    placement,
    arrowProps,
  },
  renderArrow,
  children,
  ...props
}) => (
  <ul ref={ ref } style={ style } placement={ placement } { ...props }>
    {renderArrow && <Arrow { ...arrowProps } /> }
    {children}
  </ul>
);

BaseSubMenu.propTypes = {
  children: PropTypes.node,
  renderArrow: PropTypes.bool,
  popperProps: PropTypes.shape({}),
};

BaseSubMenu.defaultProps = {
  children: null,
  renderArrow: true,
  popperProps: null,
};

const SubMenu = styled(BaseSubMenu)(
  ({ renderArrow }) => ({
    listStyle: "none",
    margin: "0",
    color: subMenuStyles.nameColor,
    backgroundColor: subMenuStyles.backgroundColor,
    borderRadius: theme.radii.medium,
    borderTop: `1px solid ${subMenuStyles.borderColor}`,
    borderBottom: `1px solid ${subMenuStyles.borderColor}`,
    boxShadow: theme.shadows.small,
    padding: "7px 0",
    transition: "opacity 0.3s",
    zIndex: "100",
    marginTop: renderArrow ? theme.space.half : "-8px",
  }),
  ({ style }) => ({
    ...style,
  }),
);

SubMenu.propTypes = {
  renderArrow: PropTypes.bool,
};

SubMenu.defaultProps = {
  renderArrow: true,
};

export default SubMenu;

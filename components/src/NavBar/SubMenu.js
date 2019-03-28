import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "ComponentsRoot/theme";

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
    renderArrow,
  },
  children,
  ...props
}) => (
  <div ref={ ref } style={ style } placement={ placement } { ...props }>
    {renderArrow && <Arrow { ...arrowProps } /> }
    {children}
  </div>
);

BaseSubMenu.propTypes = {
  children: PropTypes.node,
  popperProps: PropTypes.shape({}),
};

BaseSubMenu.defaultProps = {
  children: null,
  popperProps: null,
};

const SubMenu = styled(BaseSubMenu)(
  ({renderArrow}) => ({
  color: subMenuStyles.nameColor,
  display: "flex",
  flexDirection: "column",
  fontSize: theme.fontSizes.small,
  backgroundColor: subMenuStyles.backgroundColor,
  borderRadius: theme.radii.medium,
  borderTop: `1px solid ${subMenuStyles.borderColor}`,
  boxShadow: theme.boxShadows,
  padding: `${theme.space.x1} 0`,
  transition: "opacity 0.3s",
  zIndex: "999999",
  marginTop: renderArrow ? theme.space.half : "-9px",
}),
({ style }) => ({
  ...style,
}));

SubMenu.propTypes = {
  renderArrow: PropTypes.bool,
};

SubMenu.defaultProps = {
  renderArrow: true,
};

export default SubMenu;

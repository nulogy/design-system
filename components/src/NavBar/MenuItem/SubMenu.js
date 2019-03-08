import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import theme from "ComponentsRoot/theme";

const subMenuStyles = {
  backgroundColor: theme.colors.whiteGrey,
  borderColor: theme.colors.whiteGrey,
  textColor: theme.colors.black,
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
  children,
  ...props
}) => (
  <div ref={ ref } style={ style } placement={ placement } { ...props }>
    <Arrow { ...arrowProps } />
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

const SubMenu = styled(BaseSubMenu)({
  color: subMenuStyles.textColor,
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
  marginTop: theme.space.half,
},
({ style }) => ({
  ...style,
}));

export default SubMenu;

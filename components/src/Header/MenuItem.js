import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import theme from "../theme";
/* eslint react/destructuring-assignment: 0 */

const subMenuStyles = {
  backgroundColor: theme.colors.whiteGrey,
  borderColor: theme.colors.whiteGrey,
  textColor: theme.colors.black,
};

const SubMenu = styled.div({
  color: subMenuStyles.textColor,
  display: "flex",
  flexDirection: "column",
  fontSize: "14px",
  backgroundColor: subMenuStyles.backgroundColor,
  borderRadius: theme.radii.medium,
  border: `1px solid ${subMenuStyles.borderColor}`,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.18)",
  padding: theme.space.x1,
  transition: "opacity 0.3s",
  zIndex: "999999",
  marginTop: theme.space.half,
},
({ position }) => ({
  ...position,
}));

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

const MenuItemButton = styled.button({
  display: "inline-flex",
  color: theme.colors.white,
  borderColor: "transparent",
  backgroundColor: "transparent",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
  verticalAlign: "middle",
  lineHeight: theme.lineHeights.base,
  transition: ".2s",
  fontSize: `${theme.fontSizes.medium}`,
  padding: `${theme.space.x1} ${theme.space.x2}`,
  "&:hover, &:focus": {
    outline: "none",
    backgroundColor: theme.colors.darkBlue,
  },
  "&:active": {
    transform: "scale(0.98)",
    transition: ".2s ease-in",
  },
  "&:disabled": {
    opacity: ".5",
  },
});

class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenuOpen: false,
    };
    this.escFunction = this.escFunction.bind(this);
    this.hideSubMenu = this.hideSubMenu.bind(this);
    this.showSubMenu = this.showSubMenu.bind(this);
  }

  componentWillMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  getSubMenuProps() {
    return ({
      onFocus: () => (this.showSubMenu()),
      onBlur: () => (this.hideSubMenu()),
      onMouseEnter: () => (this.showSubMenu()),
      onMouseLeave: () => (this.hideSubMenu()),
      onClick: () => (this.showSubMenu()),
    });
  }

  getMenuItemProps() {
    return ({
      onClick: () => (this.showSubMenu()),
      onMouseLeave: () => (this.hideSubMenu()),
    });
  }

  clearScheduled() {
    clearTimeout(this.hideTimeout);
    clearTimeout(this.showTimeout);
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      this.hideSubMenu(true);
    }
  }

  hideSubMenu(skipTimer) {
    this.clearScheduled();
    if (!skipTimer) {
      this.hideTimeout = setTimeout(() => this.setState({ subMenuOpen: false }), this.props.hideDelay);
    } else {
      this.setState({ subMenuOpen: false });
    }
  }

  showSubMenu() {
    this.clearScheduled();
    this.showTimeout = setTimeout(() => this.setState({ subMenuOpen: true }), this.props.showDelay);
  }

  render() {
    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <MenuItemButton aria-haspopup="true" aria-expanded={ this.state.subMenuOpen } { ...this.props } { ...this.getMenuItemProps() } ref={ ref }>{ this.props.labelText }</MenuItemButton>
          )}
        </Reference>
        {this.state.subMenuOpen && (
        <Popper placement="bottom-start">
          {({
            ref, style, placement, arrowProps,
          }) => (
            <SubMenu
              ref={ ref } position={ style } placement={ placement }
              { ...this.getSubMenuProps() }
            >
              {this.props.children}
              <Arrow ref={ arrowProps.ref } style={ arrowProps.style } />
            </SubMenu>
          )}
        </Popper>
        )}
      </Manager>
    );
  }
}

MenuItem.propTypes = {
  labelText: PropTypes.string.isRequired,
  children: PropTypes.node,
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MenuItem.defaultProps = {
  children: null,
  showDelay: "100",
  hideDelay: "35000",
};

export default MenuItem;

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Manager, Reference, Popper } from "react-popper";
import theme from "ComponentsRoot/theme";
import SubMenu from "./SubMenu";
import SubMenuLink from "./SubMenuLink";
import { Text, Icon, Flex } from "ComponentsRoot";

const SubMenuItemsList = styled.ul({
  listStyle: "none",
  paddingLeft: "0",
  margin: "0",
});

const SubMenuTriggerButton = styled.button({
  display: "block",
  width: "100%",
  padding: `${theme.space.x1} ${theme.space.x2}`,
  "&:hover, &:focus": {
    outline: "none",
    backgroundColor: theme.colors.lightGrey,
  },
  "&:disabled": {
    opacity: ".5",
  },
  border: "none",
  backgroundColor: "transparent",
  textDecoration: "none",
  textAlign: "left",
  cursor: "pointer",
});

const keyCode = Object.freeze({
  "TAB": 9,
  "RETURN": 13,
  "ESC": 27,
  "SPACE": 32,
  "PAGEUP": 33,
  "PAGEDOWN": 34,
  "END": 35,
  "HOME": 36,
  "LEFT": 37,
  "UP": 38,
  "RIGHT": 39,
  "DOWN": 40,
});

const IconContainer = styled.span(
  {
    display: "inline-flex",
    alignSelf: "center",
    position: "relative",
    height: "1em",
    width: "20px",
    minwidth: ""
  }
);

const isDropdown = subMenuItem => (subMenuItem.subMenuItems);

/* eslint-disable react/destructuring-assignment */
class SubMenuTrigger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subMenuOpen: false,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.hideSubMenu = this.hideSubMenu.bind(this);
    this.showSubMenu = this.showSubMenu.bind(this);
  }

  setSubMenuState(newState, skipTimer = false) {
    this.clearScheduled();
    if (!skipTimer) {
      this.showTimeoutID = setTimeout(() => this.setState({ subMenuOpen: newState }), this.props.showDelay);
    } else {
      this.setState({ subMenuOpen: newState });
    }
  }

  hideSubMenu(skipTimer) {
    this.setSubMenuState(false, skipTimer);
  }

  showSubMenu(skipTimer) {
    this.setSubMenuState(true, skipTimer);
  }

  subMenuEventHandlers() {
    return ({
      onFocus: () => (this.showSubMenu()),
      onBlur: () => (this.hideSubMenu()),
      onClick: () => (this.showSubMenu()),
      onKeyDown: e => (this.handleKeyDown(e)),
    });
  }

  SubMenuTriggerEventHandlers() {
    return ({
      onClick: () => {
        this.showSubMenu();
      },
      onBlur: () => (this.hideSubMenu()),
      onKeyDown: e => (this.handleKeyDown(e)),
    });
  }

  clearScheduled() {
    clearTimeout(this.hideTimeoutID);
    clearTimeout(this.showTimeoutID);
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case keyCode.ESC:
        this.hideSubMenu(true);
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Manager>
        <Reference>
          {({ ref }) => (
            <li>
              <SubMenuTriggerButton aria-haspopup="true" aria-expanded={ this.state.subMenuOpen } { ...this.props } { ...this.SubMenuTriggerEventHandlers() } ref={ ref }>
                <Flex alignItems="center" >
                  <Text color={ "darkBlue" }>
                    { this.props.text }
                  </Text>
                  <Icon icon="rightArrow" color="darkBlue" size="20px" p="2px"/>
                </Flex>
                {this.props.subText && (
                <Text color={ "darkGrey" } fontSize={ theme.fontSizes.small } lineHeight={ theme.lineHeights.smallTextBase }>
                  {this.props.subText}
                </Text>
                )}      
              </SubMenuTriggerButton>
            </li>
          )}
        </Reference>
        {this.state.subMenuOpen && (
        <Popper placement="right-start">
          {popperProps => (
            <SubMenu renderArrow={false} popperProps={ popperProps } { ...this.subMenuEventHandlers() }>
              <SubMenuItemsList>
              {this.props.menuData.map(subMenuItem => {
                if (isDropdown(subMenuItem)) {
                  return (
                    <SubMenuTrigger key={ subMenuItem.text } text={ subMenuItem.text } subText={subMenuItem.subText} menuData={ subMenuItem.subMenuItems }/>      
                  );
                } else {
                  return (
                    <SubMenuLink key={ subMenuItem.text } text={subMenuItem.text} subText={subMenuItem.subText} href={ subMenuItem.href }/>
                  );
                }
              })}
              </SubMenuItemsList>
            </SubMenu>
          )}
        </Popper>
        )}
      </Manager>
    );
  }
}
/* eslint-enable react/destructuring-assignment */


SubMenuTrigger.propTypes = {
  text: PropTypes.string.isRequired,
  menuData: PropTypes.arrayOf(PropTypes.shape({})),
  showDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideDelay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SubMenuTrigger.defaultProps = {
  menuData: null,
  showDelay: "100",
  hideDelay: "350",
};

export default SubMenuTrigger;

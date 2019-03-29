import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Box, Link, SubsectionTitle, IconicButton, List,
} from "@nulogy/components";
import logo from "../images/nulogy.svg";
import theme from "../../../components/src/theme";
import { menuData } from "../shared/menuData";

const NavContainer = styled(Box)(
  ({ isOpen }) => ({
    background: theme.colors.whiteGrey,
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    overflow: "scroll",
    zIndex: 1,
    height: "100%",
    width: isOpen ? "100%" : "260px",
    paddingTop: theme.space.x3,
    "@media screen and (max-width: 1024px)": {
      display: isOpen ? "block" : "none",
    },
  })
);

NavContainer.propTypes = {
  isOpen: PropTypes.bool,
};

NavContainer.defaultProps = {
  isOpen: null,
};

const NavItem = styled.li({
  margin: theme.space.x2,
  marginLeft: 0,
  listStyle: "none",
});

const OpenButton = styled(IconicButton).attrs({
  icon: "menu",
})({
  margin: theme.space.x2,
  "@media screen and (min-width: 1024px)": {
    display: "none",
  },
});

const CloseButton = styled(IconicButton).attrs({
  icon: "cancel",
})(
  ({ isOpen }) => ({
    position: "absolute",
    top: theme.space.x2,
    right: theme.space.x2,
    "@media screen and (min-width: 1024px)": {
      display: isOpen ? "block" : "none",
    },
  })
);

CloseButton.propTypes = {
  isOpen: PropTypes.bool,
};

CloseButton.defaultProps = {
  isOpen: null,
};

class Navigation extends React.Component {
  constructor() {
    super();

    this.state = {
      menuOpen: false,
    };

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  openMenu() {
    this.setState({ menuOpen: true });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    return (
      <>
        <OpenButton onClick={ this.openMenu } />
        <NavContainer isOpen={ this.state.menuOpen }>
          <CloseButton isOpen={ this.state.menuOpen } onClick={ this.closeMenu } />
          <Box pt="x4" pb="0" px="x4">
            <Link href="/"><img src={ logo } alt="Logo" width="75px" style={ { margin: "auto" } } /></Link>
          </Box>
          <Box p="x4">
            {menuData.map(menuItem => (
              <List key={ menuItem.name } mb="x4" p="0">
                <SubsectionTitle>{menuItem.name}</SubsectionTitle>
                {menuItem.links.map(menuLink => (
                  <NavItem key={ menuLink.href }><Link href={ menuLink.href } underline={ false }>{menuLink.name}</Link></NavItem>
                ))}
              </List>
            ))}
          </Box>
        </NavContainer>
      </>
    );
  }
}

export { Navigation };

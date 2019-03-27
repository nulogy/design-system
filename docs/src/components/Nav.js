import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Box, Link, SubsectionTitle, IconicButton, List, ListItem,
} from "@nulogy/components";
import logo from "../images/nulogy.svg";
import theme from "../../../components/src/theme";
import { menuData } from "../shared/menuData";

const NavContainer = styled(Box)(
  ({ isOpen }) => ({
    background: theme.colors.whiteGrey,
    top: 0,
    left: 0,
    position: "fixed",
    overflow: "scroll",
    height: "100%",
    width: isOpen ? "100%" : "auto",
    paddingTop: theme.space.x3,
    "@media screen and (max-width: 1024px)": {
      display: isOpen ? "block" : "none",
    },
  })
);

const NavItem = styled.li`
    margin: ${theme.space.x2};
    margin-left: 0;
    list-style: none;
`;

const OpenButton = styled(IconicButton).attrs({
  icon: "menu",
})({
  position: "absolute",
  top: 0,
  left: 0,
  margin: "16px",
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
              <List mb="x4" p="0">
                <SubsectionTitle>{menuItem.name}</SubsectionTitle>
                {menuItem.links.map(menuLink => (
                  <NavItem><Link href={ menuLink.href } underline={ false }>{menuLink.name}</Link></NavItem>
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

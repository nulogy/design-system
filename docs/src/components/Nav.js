import React from "react";
import PropTypes from "prop-types";
import styled, { createGlobalStyle } from "styled-components";
import {
  Box,
  Link,
  SubsectionTitle,
  IconicButton,
  List,
  Branding
} from "@nulogy/components";
import theme from "../../../components/src/theme";
import { menuData } from "../shared/menuData";

const LockBody = createGlobalStyle(({ isOpen }) => ({
  body: {
    height: isOpen ? "100%" : null,
    overflow: isOpen ? "hidden" : null
  }
}));

const NavContainer = styled(Box)(({ isOpen }) => ({
  background: theme.colors.darkBlue,
  position: isOpen ? "absolute" : "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  overflow: "scroll",
  zIndex: theme.zIndex.overlay,
  height: "100%",
  width: isOpen ? "100%" : "220px",
  paddingTop: theme.space.x3,
  "-webkit-overflow-scrolling": "touch",
  "@media screen and (max-width: 1024px)": {
    display: isOpen ? "block" : "none"
  }
}));

NavContainer.propTypes = {
  isOpen: PropTypes.bool
};

NavContainer.defaultProps = {
  isOpen: null
};

const NavItem = styled.li({
  margin: theme.space.x2,
  marginLeft: theme.space.x1,
  listStyle: "none"
});

const OpenButton = styled(IconicButton).attrs({
  icon: "menu"
})({
  margin: theme.space.x2,
  "@media screen and (min-width: 1024px)": {
    display: "none"
  }
});

const CloseButton = styled(IconicButton).attrs({
  icon: "cancel"
})(({ isOpen }) => ({
  position: "absolute",
  top: theme.space.x2,
  right: theme.space.x2,
  "@media screen and (min-width: 1024px)": {
    display: isOpen ? "block" : "none"
  }
}));

CloseButton.propTypes = {
  isOpen: PropTypes.bool
};

CloseButton.defaultProps = {
  isOpen: null
};

class Navigation extends React.Component {
  constructor() {
    super();

    this.state = {
      menuOpen: false
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
    const { menuOpen } = this.state;
    return (
      <>
        <OpenButton onClick={this.openMenu} />
        <LockBody isOpen={menuOpen} />
        <NavContainer isOpen={menuOpen}>
          <CloseButton isOpen={menuOpen} onClick={this.closeMenu} />
          <Link
            underline={false}
            style={{ display: "inline-block" }}
            mt="x4"
            mb="x2"
            ml="x4"
            href="/"
          >
            <Branding mb="x4" logoColor="white" subtext="Design System" />
          </Link>
          <Box p="x4">
            {menuData.map(menuItem => (
              <Box key={menuItem.name} mb="x6" p="0">
                <SubsectionTitle color="whiteGrey">
                  {menuItem.name}
                </SubsectionTitle>
                <List pl="0">
                  {menuItem.links.map(menuLink => (
                    <NavItem key={menuLink.href}>
                      <Link
                        color="white"
                        href={menuLink.href}
                        underline={false}
                      >
                        {menuLink.name}
                      </Link>
                    </NavItem>
                  ))}
                </List>
              </Box>
            ))}
          </Box>
        </NavContainer>
      </>
    );
  }
}

export { Navigation };

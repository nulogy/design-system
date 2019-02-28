import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Flex,
  HeaderSearch,
  Icon,
} from "ComponentsRoot";
import theme from "../theme";

const BrandingBase = ({
  ...props,
}) => (
  <a href="#" { ...props }>
    <img src="NulogyLogoLarge.svg" alt="Nulogy logo" />
  </a>
);

const Branding = styled(BrandingBase)(
  {
    color: theme.colors.white,
    outline: "solid 1px lime",
    height: "40px",
    display: "flex",
    alignItems: "center",
  }
);

const NavBase = ({
  ...props,
}) => (
  <ul { ...props }>
    <li><a href="">Menu item 1</a>
      <ul>
        <li><a href="">Menu item 1-1</a></li>
        <li><a href="">Menu item 1-2</a></li>
      </ul>
    </li>
    <li><a href="">Menu item 2</a>
      <ul>
        <li><a href="">Menu item 2-1</a></li>
        <li><a href="">Menu item 2-2</a></li>
      </ul>
    </li>
  </ul>
);

const Nav = styled(NavBase)(
  {
    listStyle: "none",
    paddingLeft: "0",
    margin: "0",
    display: "flex",
    padding: "0 8px",
    "li": {
      padding: "0 8px",
    },
    "ul": {
      display: "block",
      display: "none",
    },
    "a": {
      color: "white",
      padding: "8px 0",
      display: "block",
    },
  }
);

const MenuTriggerBase = ({
  className,
  ...props,
}) => (
  <button { ...props } className={className}>
    <Icon icon="menu" title="Menu" display={ { small: "block", medium: "none", large: "block" } } />
  </button>
);

const MenuTrigger = styled(MenuTriggerBase)(
  {
    background: "none",
    //border: "none",
    color: theme.colors.white,
    marginLeft: "16px",
  }
);

const BaseHeader = ({
  className,
  display,
  ...props,
}) => (
  <header { ...props } className={ className } >
    <Branding />
    <nav>
      <MenuTrigger display={ { small: "block", medium: "none", large: "block" } } />
      <Nav className="primary" />
      <HeaderSearch />
      <Nav className="secondary" />
    </nav>
  </header>
);

const Header = styled(BaseHeader)(
  {
    display: "flex",
    padding: theme.space.x2,
    background: theme.colors.blackBlue,
    justifyContent: "space-between",
    "nav": {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      flexGrow: "2",
      ".primary": {
        marginRight: "16px",
      },
      ".secondary": {
        flexGrow: "1",
        justifyContent: "flex-end",
      },
    },

  }
);

BaseHeader.propTypes = {
  className: PropTypes.string,
};

BaseHeader.defaultProps = {
  className: null,
};

export default Header;

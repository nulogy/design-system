import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Flex,
  HeaderSearch,
} from "ComponentsRoot";
import Branding from "./Branding";
import DesktopMenu from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import theme from "../theme";

const BaseHeader = ({
  menuData,
  desktopSrc,
  mobileSrc,
  alt,
  ...props
}) => (
  <header { ...props }>
    <Branding desktopSrc={ desktopSrc } mobileSrc={ mobileSrc } alt={ alt } />
    <nav>
      <Flex justifyContent={ { small: "flex-end", medium: "flex-end", large: "space-between" } }>
        <Flex alignItems="center">
          <DesktopMenu menuData={ menuData.primary } display={ { small: "none", medium: "none", large: "flex" } } />
        </Flex>
        <Flex>
          <Flex maxWidth="18em" alignItems="center" px={ { small: "0", medium: "0", large: "x3" } }>
            <HeaderSearch />
          </Flex>
          <DesktopMenu menuData={ menuData.secondary } display={ { small: "none", medium: "none", large: "flex" } } />
          <MobileMenu display={ { small: "block", medium: "block", large: "none" } } />
        </Flex>
      </Flex>
    </nav>
  </header>
);

BaseHeader.propTypes = {
  menuData: PropTypes.shape({
    "primary": PropTypes.shape({}),
    "secondary": PropTypes.shape({}),
  }),
  desktopSrc: PropTypes.string,
  mobileSrc: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

BaseHeader.defaultProps = {
  menuData: null,
  desktopSrc: undefined,
  mobileSrc: undefined,
  alt: undefined,
  className: null,
};

const Header = styled(BaseHeader)({
  background: theme.colors.blackBlue,
  paddingTop: theme.space.x2,
  paddingRight: theme.space.x3,
  paddingBottom: theme.space.x2,
  paddingLeft: theme.space.x4,
  display: "flex",
  alignItems: "center",
  "nav": {
    flexGrow: "1",
    margin: `0 0 0 ${theme.space.x3}`,
  },
});

export default Header;

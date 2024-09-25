// @ts-nocheck
import React from "react";
import { Branding } from "../Branding";
import { Flex } from "../Flex";
import theme from "../theme";
import NavBarSearch from "../NavBarSearch/NavBarSearch";
import { PreventBodyElementScrolling, withMenuState } from "../utils";
import MobileMenu from "./MobileMenu";
import {
  BrandingLink,
  getThemeColor,
  MenuIcon,
  MobileMenuTrigger,
  NavBarBackground,
  pixelDigitsFrom,
  SmallHeader,
} from "./NavBar";

class SmallNavBarNoState extends React.Component {
  constructor(props) {
    super(props);
    this.navRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.menuState.isOpen && !prevProps.menuState.isOpen) this.navRef.current.scrollTop = 0;
  }

  isSmallScreen() {
    const { breakpointLower, width } = this.props;

    return width < pixelDigitsFrom(breakpointLower);
  }

  render() {
    const {
      menuData,
      menuState: { isOpen, toggleMenu, closeMenu },
      subtext,
      brandingLinkHref,
      brandingLinkTo,
      themeColor,
      ...props
    } = this.props;
    return (
      <SmallHeader ref={this.navRef} isOpen={isOpen} {...props}>
        <NavBarBackground backgroundColor={getThemeColor(themeColor).background}>
          <BrandingLink
            aria-label="Nulogy logo"
            display="block"
            height={subtext && !this.isSmallScreen() ? "56px" : "40px"}
            my={subtext && !this.isSmallScreen() ? "-8px" : null}
            underline={false}
            href={brandingLinkHref}
            to={brandingLinkTo}
          >
            <Branding
              logoColor={getThemeColor(themeColor).logoColor}
              logoType={this.isSmallScreen() ? "lettermark" : "wordmark"}
              subtext={this.isSmallScreen() ? null : subtext}
            />
          </BrandingLink>
          <Flex justifyContent="flex-end" style={{ flexGrow: 1, margin: `0 0 0 ${theme.space.x3}` }}>
            {menuData.search && (
              <Flex maxWidth="18em" alignItems="center" px="0">
                <NavBarSearch {...menuData.search} />
              </Flex>
            )}
            {(menuData.primaryMenu || menuData.secondaryMenu) && (
              <MobileMenuTrigger
                {...getThemeColor(themeColor)}
                onClick={toggleMenu}
                aria-expanded={isOpen ? true : null}
              >
                <MenuIcon isOpen={isOpen} />
              </MobileMenuTrigger>
            )}
          </Flex>
        </NavBarBackground>
        {isOpen && (
          <PreventBodyElementScrolling>
            <MobileMenu
              themeColorObject={getThemeColor(themeColor)}
              subtext={subtext}
              includeSubtext={this.isSmallScreen()}
              menuData={menuData}
              closeMenu={closeMenu}
            />
          </PreventBodyElementScrolling>
        )}
      </SmallHeader>
    );
  }
}

SmallNavBarNoState.defaultProps = {
  menuData: null,
  subtext: null,
  brandingLinkHref: "/",
  brandingLinkTo: undefined,
  breakpointLower: theme.breakpoints.small,
  width: undefined,
  themeColor: undefined,
};

const SmallNavBar = withMenuState(SmallNavBarNoState);

export default SmallNavBar;

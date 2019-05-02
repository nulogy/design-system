import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import { Flex } from "../Flex";
import { Icon } from "../Icon";
import NavBarSearch from "../NavBarSearch/NavBarSearch";
import Branding from "./Branding";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";
import { withMenuState } from "./withMenuState";
import isValidMenuItem from "./isValidMenuItem";
import theme from "../theme";
import { subPx } from "../Utils";

const LockBody = createGlobalStyle(
  ({ isOpen }) => ({
    body: {
      height: isOpen ? "100%" : null,
      overflow: isOpen ? "hidden" : null,
    },
  })
);

const MediumNavBar = ({
  menuData,
  desktopSrc,
  alt,
  style,
  ...props
}) => (
  <header { ...props }>
    <Flex style={ style }>
      <Branding desktopSrc={ desktopSrc } alt={ alt } />
      <Flex justifyContent="space-between" alignContent="flex-end" style={ { flexGrow: "1", margin: `0 0 0 ${theme.space.x3}` } }>
        {menuData.primaryMenu
          && <DesktopMenu style={ { paddingRight: theme.space.x3 } } aria-labelledby="primary-navigation" menuData={ menuData.primaryMenu } />
        }
        <Flex style={ { float: "right" } }>
          {menuData.search
          && (
          <div style={ { maxWidth: "18em" } }>
            <NavBarSearch { ...menuData.search } />
          </div>
          )
          }
          {menuData.secondaryMenu
          && <DesktopMenu aria-labelledby="secondary-navigation" pl="x2" menuData={ menuData.secondaryMenu } />
          }
        </Flex>
      </Flex>
    </Flex>
  </header>
);

MediumNavBar.propTypes = {
  alt: PropTypes.string,
  desktopSrc: PropTypes.string,
  menuData: PropTypes.shape({}),
};

MediumNavBar.defaultProps = {
  alt: null,
  desktopSrc: undefined,
  menuData: null,
};

const MobileMenuTrigger = styled.button(
  {
    color: theme.colors.white,
    background: "none",
    border: "none",
    padding: `${subPx(theme.space.x1)} ${theme.space.x1}`,
    marginLeft: theme.space.x1,
    borderRadius: theme.radii.medium,
    transition: ".2s",
    height: theme.space.x5,
    "&:hover, &:focus": {
      outline: "none",
      color: theme.colors.lightBlue,
      backgroundColor: theme.colors.black,
      cursor: "pointer",
    },
  }
);

const SmallHeader = styled.header(({ isOpen }) => (
  isOpen ? {
  position: "fixed",
  width: "100%",
  height: "100%",
  zIndex: "100",
  overflow: "scroll",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  } :
  null
  )
);

class SmallNavBarNoState extends React.Component { 
  constructor() {
    super();
    this.navRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (this.props.menuState.isOpen && !prevProps.menuState.isOpen) this.navRef.current.scrollTop = 0;
  }

  render() {
    const {
      display,
      menuData,
      menuState: { isOpen, handleMenuToggle, closeMenu },
      mobileSrc,
      style,
      alt,
      ...props
    }= this.props; 
  return(
    <>
      <LockBody isOpen={ isOpen } />
      <SmallHeader ref={ this.navRef } isOpen={ isOpen } { ...props }>
        <Flex style={ style }>
          <Branding mobileSrc={ mobileSrc } alt={ alt } />
          <Flex justifyContent="flex-end" style={ { flexGrow: "1", margin: `0 0 0 ${theme.space.x3}` } }>
            {menuData.search
            && (
            <Flex maxWidth="18em" alignItems="center" px="0">
              <NavBarSearch { ...menuData.search } />
            </Flex>
            )
          }
            {(menuData.primaryMenu || menuData.secondaryMenu)
            && (
            <MobileMenuTrigger onClick={()=>{handleMenuToggle()}} aria-expanded={ isOpen ? true : null }>
              {
              isOpen
                ? <Icon icon="close" title="Close Menu" />
                : <Icon icon="menu" title="Open Menu" />
              }
            </MobileMenuTrigger>
            )
          }
          </Flex>
        </Flex>
        {(isOpen) && (
          <MobileMenu menuData={ menuData } closeMenu={ closeMenu } />
          )
        }
      </SmallHeader>
    </>
    )
  }
};

const SmallNavBar = withMenuState(SmallNavBarNoState);

const navBarStyles = {
  background: theme.colors.blackBlue,
  padding: `${theme.space.x2} ${theme.space.x3}`,
};

class BaseNavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth });
  }  

  render () {
    const {
      menuData,
      ...props
    } = this.props;
    if (this.state.width >= this.props.breakpoint) {
      return(
        <MediumNavBar { ...props } menuData={ menuData } style={ navBarStyles } />
      );
    } else {
      return(
        <SmallNavBar { ...props } menuData={ menuData } style={ navBarStyles } />
      );
    }
  }
}

BaseNavBar.propTypes = {
  menuData: PropTypes.shape({
    "primaryMenu": PropTypes.arrayOf(isValidMenuItem),
    "secondaryMenu": PropTypes.arrayOf(isValidMenuItem),
    "search": PropTypes.shape({
      "onSubmit": PropTypes.func,
    }),
  }),
  className: PropTypes.string,
  breakpoint: PropTypes.number,
};

BaseNavBar.defaultProps = {
  menuData: null,
  className: null,
  breakpoint: 1024,
};

const NavBar = styled(BaseNavBar)({});

export default NavBar;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Box,
  Flex,
  Icon,
  SubsectionTitle,
} from "ComponentsRoot";
import { transparentize } from "polished";
import SubMenuItem from "./SubMenuItem";
import MenuItem from "./MenuItem";
import SubMenuItemList from "./MenuDropdown/SubMenuItemList";
import theme from "../theme";
import { subPx } from "../Utils";

const isSubMenu = menuItem => (menuItem.subMenuItems);

const SubMenu = ({ menuItem }) => (
  <div>
    <SubsectionTitle key={ menuItem.text }>{menuItem.text}</SubsectionTitle>
    <SubMenuItemList>
      {
        menuItem.subMenuItems.map(subMenuItem => (
          <SubMenuItem textColor="lightGrey" subTextColor="grey" key={ subMenuItem.text } { ...subMenuItem } />
        ))
      }
    </SubMenuItemList>
  </div>
);

const MenuLink = ({ menuItem }) => (
  <div>
    <MenuItem key={ menuItem.text } href={ menuItem.href }>
      {menuItem.text}
    </MenuItem>
  </div>
);

class MenuState extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen,
    });
  }

  render() {
    const { isOpen } = this.state;
    const { children: renderMenu } = this.props;

    return renderMenu({
      isOpen,
      handleMenuToggle: this.handleOnClick,
    });
  }
}

const MobileMenuBase = ({
  menuData,
  menuState: { isOpen, handleMenuToggle },
  ...props
}) => (
  <Box { ...props } display={ { small: "block", medium: "block", large: "none" } }>
    <button onClick={ handleMenuToggle }>
      {
      isOpen
        ? <Icon icon="close" title="Close Menu" />
        : <Icon icon="menu" title="Open Menu" />
    }

    </button>

    {
      isOpen
        && (
          <Menu>
            {
              menuData.map(menuItem => {
                if (isSubMenu(menuItem)) {
                  return <SubMenu menuItem={ menuItem } />;
                } else {
                  return <MenuLink menuItem={ menuItem } />;
                }
              })
            }
          </Menu>
        )
    }
  </Box>
);

const Menu = styled.div(() => (
  {
    position: "absolute",
    left: "0",
    top: "72px",
    padding: `${theme.space.x4} 0`,
    zIndex: "10",
    width: "100%",
    backgroundColor: theme.colors.blackBlue,
    color: theme.colors.white,
  }));

const MobileMenu = styled(MobileMenuBase)(
  {
    "button": {
      color: theme.colors.white,
      background: "none",
      border: "none",
      padding: `${subPx(theme.space.x1)} ${theme.space.x1}`,
      marginLeft: theme.space.x1,
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
);

MobileMenuBase.propTypes = {
  menuData: PropTypes.arrayOf(PropTypes.shape({})),
};

MobileMenuBase.defaultProps = {
  menuData: null,
};

const MobileMenuWithState = ({
  ...props
}) => (
  <MenuState>
    {
      menuState => <MobileMenu menuState={ menuState } { ...props } />
    }
  </MenuState>
);

// export default MobileMenu;
export default MobileMenuWithState;

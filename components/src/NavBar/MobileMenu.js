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

const MobileMenuBase = ({
  menuData,
  ...props
}) => (
  <Box { ...props } display={ { small: "block", medium: "block", large: "none" } }>
    <button><Icon icon="menu" title="Menu" /></button>

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

export const MobileMenu = styled(MobileMenuBase)(
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

export default MobileMenu;

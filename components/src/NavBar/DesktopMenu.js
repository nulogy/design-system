import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Flex } from "ComponentsRoot";
import { MenuDropdown } from "./MenuDropdown";
import SubMenuItem from "./SubMenuItem";
import MenuLink from "./MenuLink";
import theme from "../theme";

const isDropdown = menuItem => (menuItem.subMenuItems);

const BaseDesktopMenu = ({
  menuData,
  ...props
}) => (
  <Flex { ...props }>
    {menuData.map(menuItem => {
      if (isDropdown(menuItem)) {
        return (
          <div key={ menuItem.text }>
            <MenuDropdown labelText={ menuItem.text }>
              {menuItem.subMenuItems.map(subMenuItem => (
                <SubMenuItem key={ subMenuItem.text } { ...subMenuItem } />
              ))}
            </MenuDropdown>
          </div>
        );
      } else {
        return (
          <div key={ menuItem.text }>
            <MenuLink href={ menuItem.href }>
              {menuItem.text}
            </MenuLink>
          </div>
        );
      }
    })}
  </Flex>
);

BaseDesktopMenu.propTypes = {
  menuData: PropTypes.arrayOf(PropTypes.shape({})),
};

BaseDesktopMenu.defaultProps = {
  menuData: null,
};

const DesktopMenu = styled(BaseDesktopMenu)(
  {
    "div": {
      ":not(:last-of-type)": {
        marginRight: theme.space.x1,
      },
    },
  },
);

export default DesktopMenu;

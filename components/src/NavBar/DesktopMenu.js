import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Flex } from "ComponentsRoot";
import MenuDropdown from "./MenuDropdown";
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
          <div key={ menuItem.name }>
            <MenuDropdown labelText={ menuItem.name }>
              {menuItem.subMenuItems.map(subMenuItem => (
                <SubMenuItem key={ subMenuItem.name } { ...subMenuItem } tabIndex="-1" />
              ))}
            </MenuDropdown>
          </div>
        );
      } else {
        return (
          <div key={ menuItem.name }>
            <MenuLink href={ menuItem.href }>
              {menuItem.name}
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

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "ComponentsRoot";
import { MenuDropdown } from "./MenuDropdown";
import SubMenuItem from "./SubMenuItem";
import MenuItem from "./MenuItem";
import theme from "../theme";

const isDropdown = menuItem => (menuItem.subMenuItems);

const BaseDesktopMenu = ({
  menuData,
  ...props
}) => (
  <Box { ...props }>
    {menuData.map(menuItem => {
      if (isDropdown(menuItem)) {
        return (
          <div key={ menuItem.text }>
            <MenuDropdown labelText={ menuItem.text }>
              {menuItem.subMenuItems.map(subMenuItem => (
                <SubMenuItem key={ subMenuItem.text } href={ subMenuItem.href } subText={ subMenuItem.subText }>
                  {subMenuItem.text}
                </SubMenuItem>
              ))}
            </MenuDropdown>
          </div>
        );
      } else {
        return (
          <div key={ menuItem.text }>
            <MenuItem href={ menuItem.href }>
              {menuItem.text}
            </MenuItem>
          </div>
        );
      }
    })}
  </Box>
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

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "ComponentsRoot";
import { MenuDropdown } from "./MenuDropdown";
import SubMenuItem from "./SubMenuItem";
import theme from "../theme";

const BaseDesktopMenu = ({
  menuData,
  ...props
}) => (
  <Box { ...props }>
    {menuData.map(menuDropDown => (
      <MenuDropdown key={ menuDropDown.text } labelText={ menuDropDown.text }>
      {menuDropDown.subMenuItems.map(subMenuItem => (
        <SubMenuItem key={ subMenuItem.text } href={ subMenuItem.href } subText={ subMenuItem.subText }>
          {subMenuItem.text}
        </SubMenuItem>
      ))}
      </MenuDropdown>
    ))}
  </Box>
);

BaseDesktopMenu.propTypes = {
  menuData: PropTypes.array,
};

BaseDesktopMenu.defaultProps = {
  menuData: null,
};

const DesktopMenu = styled(BaseDesktopMenu)(
  {
    "button": {
      marginRight: theme.space.x1,
      ":last-child": {
        marginRight: theme.space.none,
      },
    },

  }
);

export default DesktopMenu;

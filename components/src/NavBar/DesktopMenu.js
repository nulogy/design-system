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
    {Object.entries(menuData).map(([menuDropdownKey, menuDropdown]) => (
      <MenuDropdown key={ menuDropdownKey } labelText={ menuDropdownKey }>
        {Object.entries(menuDropdown).map(([subMenuItemKey, subMenuItem]) => (
          <SubMenuItem key={ subMenuItemKey } href={ subMenuItem.href } subText={ subMenuItem.subText }>
            { subMenuItemKey }
          </SubMenuItem>
        ))}
      </MenuDropdown>
    ))}
  </Box>
);

BaseDesktopMenu.propTypes = {
  menuData: PropTypes.shape({}),
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

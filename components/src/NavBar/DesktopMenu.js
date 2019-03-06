import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Box } from "ComponentsRoot";
import MenuItem from "./MenuItem";
import SubMenuItem from "./SubMenuItem";
import theme from "../theme";

const BaseDesktopMenu = ({
  menuData,
  ...props
}) => (
  <Box { ...props }>
    {Object.entries(menuData).map(menuItem => (
      <MenuItem key={ menuItem[0] } labelText={ menuItem[0] }>
        {Object.entries(menuItem[1]).map(subMenuItem => (
          <SubMenuItem key={ subMenuItem[0] } href={ subMenuItem[1].href } subText={ subMenuItem[1].subText }>
            { subMenuItem[0] }
          </SubMenuItem>
        ))}
      </MenuItem>
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
    },
  }
);

export default DesktopMenu;

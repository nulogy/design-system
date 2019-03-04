import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { darken } from "polished";
import {
  Box,
  Flex,
  Icon,
} from "ComponentsRoot";
import MenuItem from "./MenuItem";
import SubMenuItem from "./SubMenuItem";
import theme from "../theme";
import { subPx } from "../Utils";

const DesktopMenuBase = ({
  menuData,
  ...props
}) => (
  <Box { ...props }>
    {Object.entries(menuData).map( menuItem => (
    <MenuItem labelText={ menuItem[0] }>
      <ul>
        {Object.entries(menuItem[1]).map( subMenuItem => (
          <SubMenuItem key={ subMenuItem[0] } href={ subMenuItem[1].href } subText={ subMenuItem[1].subText }>
            { subMenuItem[0] }
          </SubMenuItem>
        ))}
      </ul>
    </MenuItem>
    ))}
  </Box>
);

const DesktopMenu = styled(DesktopMenuBase)(
  {
    "button": {
      marginRight: theme.space.x1,  
    },
    "ul": {
      listStyle: "none",
      paddingLeft: "0",
      margin: "0",
    },
  }
);

export default DesktopMenu;

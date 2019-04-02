import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Flex } from "ComponentsRoot";
import MenuTrigger from "./MenuTrigger";
import MenuLink from "./MenuLink";
import theme from "../theme";

const isTrigger = menuItem => (menuItem.items);

const BaseDesktopMenu = ({
  menuData,
  ...props
}) => (
  <Flex { ...props }>
    {menuData.map(menuItem => {
      if (isTrigger(menuItem)) {
        return (
          <div key={ menuItem.name }>
            <MenuTrigger labelText={ menuItem.name } menuData={ menuItem.items } />
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

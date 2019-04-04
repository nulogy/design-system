import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Flex } from "ComponentsRoot";
import MenuTrigger from "./MenuTrigger";
import MenuLink from "./MenuLink";
import theme from "../theme";

const itemType = menuItem => {
  if ( menuItem.items ){
    return "MenuTrigger";
  } else if ( menuItem.link ) {
    return "CustomLink";
  } else if ( menuItem.href && menuItem.name) {
    return "MenuLink";
  } else {
    return null;
  }
};

const BaseDesktopMenu = ({
  menuData,
  ...props
}) => (
  <Flex { ...props }>
    {menuData.map(menuItem => {
      switch (itemType(menuItem)) {
      case "MenuTrigger":
        return (
          <div key={ menuItem.name }>
            <MenuTrigger name={ menuItem.name } menuData={ menuItem.items } />
          </div>
        );
      case "MenuLink":
        return (
          <div key={ menuItem.name }>
            <MenuLink href={ menuItem.href }>
              {menuItem.name}
            </MenuLink>
          </div>
        );
      case "CustomLink":
        return (
          <div key={menuItem.name}>
            {menuItem.link}
          </div>
        )
      default:
        return(<div style={{color: "red"}}>Data Missing</div>)  
    }}
    )}
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

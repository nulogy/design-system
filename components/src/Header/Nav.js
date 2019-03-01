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
import theme from "../theme";
import { subPx } from "../Utils";

const NavBase = ({
  ...props,
}) => (
  <Box display={ { small: "none", medium: "none", large: "flex" } } position={ { small: "absolute", medium: "absolute", large: "static" } } >
    <ul { ...props }>
      <li><a href="">Dashboard</a>
        <Box display={ { small: "none", medium: "none", large: "none" } }>
          <ul>
            <li><a href="">Menu item 1-1</a></li>
            <li><a href="">Menu item 1-2</a></li>
          </ul>
        </Box>
      </li>
      <li><a href="">Inspector</a>
        <Box display={ { small: "none", medium: "none", large: "none" } }>
          <ul>
            <li><a href="">Menu item 2-1</a></li>
            <li><a href="">Menu item 2-2</a></li>
          </ul>
        </Box>
      </li>
      <li><a href="">Reports</a></li>
    </ul>
  </Box>
);

const Nav = styled(NavBase)(
  {
    display: "flex",
    listStyle: "none",
    paddingLeft: "0",
    margin: "0",
    "li": {
      margin: `0 ${theme.space.x1}`,
    },
    "ul": {
      display: "block",
    },
    "a": {
      color: theme.colors.white,
      padding: theme.space.x1,
      display: "block",
      borderRadius: theme.radii.medium,
      ":focus": {
        outline: "none",
        background: theme.colors.darkBlue,
      }
    },
  }
);

const MenuTriggerBase = ({
  ...props,
}) => (
  <Box { ...props } display={ { small: "block", medium: "block", large: "none" } }>
    <button>
      <Icon icon="menu" title="Menu" />
    </button>
  </Box>
);

export const MenuTrigger = styled(MenuTriggerBase)(
  {
    "button": {
      color: theme.colors.white,
      background: "none",
      border: "none",
      padding: `${subPx(theme.space.x1)} ${theme.space.x1}`,
      marginLeft: theme.space.x1,
    },
  },
);

export default Nav;

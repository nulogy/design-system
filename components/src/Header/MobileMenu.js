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

const MobileMenuBase = ({
  ...props
}) => (
  <Box { ...props } display={ { small: "block", medium: "block", large: "none" } }>
    <button>
      <Icon icon="menu" title="Menu" />
    </button>
  </Box>
);

export const MobileMenu = styled(MobileMenuBase)(
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

export default MobileMenu;

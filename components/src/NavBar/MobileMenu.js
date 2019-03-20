import React from "react";
import styled from "styled-components";
import {
  Box,
  Icon,
} from "ComponentsRoot";
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
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
);

export default MobileMenu;

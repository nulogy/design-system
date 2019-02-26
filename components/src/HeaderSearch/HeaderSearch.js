import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { space } from "styled-system";
import { darken, transparentize } from "polished";
import { Flex, Input, Button, Icon } from "ComponentsRoot";
//import Label from "../Field/Field";
import theme from "../theme";

const BaseHeaderSearch = ({
  ...props
}) => (
    <form { ...props }>
      <Flex role="search">
        <label for="search" tabindex="-1">Search Nulogy</label>
        <Input placeholder="Search Nulogy ..." id="search" type="search" />
        <button><Icon icon="search" /></button>
      </Flex>
    </form>
);

const HeaderSearch = styled(BaseHeaderSearch)(
  {
    background: theme.colors.lightBlue,
    borderRadius: theme.radii.medium,
    "label": {
      position: "absolute !important",
      height: "1px",
      width: "1px",
      overflow: "hidden",
      clip: "rect(1px, 1px, 1px, 1px)",
    },
    "button": {
      color: theme.colors.blackBlue,
      border: "solid 1px transparent",
      background: "transparent",
      borderRadius: theme.radii.medium,
      display: "flex",
      ":focus": {
        boxShadow: "none",
        border: `solid 1px ${theme.colors.lightBlue}`,
        outline: "none",
        background: darken(0.1, theme.colors.blue),
        color: theme.colors.white,
      }
    },
    "Input": {
      border: "solid 1px transparent",
      borderRadius: theme.radii.medium,
      background: "transparent",
      color: theme.colors.blackBlue,
      ":focus": {
        background: theme.colors.white,
        border: "solid 1px transparent",
        boxShadow: "none",
      },
      "::placeholder": {
        color: transparentize(0.4, theme.colors.black),
      },
    },
  }
);

BaseHeaderSearch.propTypes = {
  required: PropTypes.bool,
}

BaseHeaderSearch.defaultProps = {
  required: false,
};

export default HeaderSearch;

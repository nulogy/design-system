import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { darken, transparentize } from "polished";
import {
  Flex,
  Input,
  Icon,
} from "ComponentsRoot";
import theme from "../theme";

const BaseHeaderSearch = ({
  name,
  onSubmit,
  ...props
}) => (
  <form { ...props } onSubmit={ onSubmit }>
    <Flex role="search">
      <Input type="search" aria-labelledby={ name } required placeholder="Search Nulogy ..." />
      <button id={ name } aria-label={ name }><Icon icon="search" /></button>
    </Flex>
  </form>
);

const HeaderSearch = styled(BaseHeaderSearch)(
  {
    background: theme.colors.lightBlue,
    borderRadius: theme.radii.medium,
    height: "40px",
    minWidth: "7em",
    width: "100%",
    maxWidth: "18em",
    "button": {
      display: "flex",
      color: theme.colors.blackBlue,
      background: "transparent",
      border: "solid 1px transparent",
      borderRadius: theme.radii.medium,
      ":focus": {
        color: theme.colors.white,
        background: darken(0.1, theme.colors.blue),
        border: `solid 1px ${theme.colors.lightBlue}`,
        outline: "none",
        boxShadow: "none",
      },
    },
    "Input": {
      color: theme.colors.blackBlue,
      background: "transparent",
      border: "solid 1px transparent",
      borderRadius: theme.radii.medium,
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
  name: PropTypes.string,
  onSubmit: PropTypes.func,
};

BaseHeaderSearch.defaultProps = {
  name: "global-search",
  onSubmit: () => {},
};

export default HeaderSearch;

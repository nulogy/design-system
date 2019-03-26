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

class BaseNavBarSearch extends React.Component {
  constructor() {
    super();

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(e);
  }

  render() {
    const { name, onSubmit, ...props } = this.props;

    return (
      <form { ...props } onSubmit={ this.handleOnSubmit }>
        <Flex role="search">
          <Input id="navbar-search" type="search" aria-labelledby={ name } required placeholder="Search Nulogy ..." />
          <button id={ name } aria-label={ name }><Icon icon="search" /></button>
        </Flex>
      </form>
    );
  }
};

const NavBarSearch = styled(BaseNavBarSearch)(
  {
    background: theme.colors.lightBlue,
    borderRadius: theme.radii.medium,
    height: "40px",
    minWidth: "7em",
    width: "100%",
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

BaseNavBarSearch.propTypes = {
  name: PropTypes.string,
  onSubmit: PropTypes.func,
};

BaseNavBarSearch.defaultProps = {
  name: "global-search",
  onSubmit: () => {},
};

export default NavBarSearch;

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { darken, transparentize } from "polished";
import { useTranslation } from "react-i18next";
import { Flex } from "../Flex";
import { Input } from "../Input";
import { Icon } from "../Icon";
import theme from "../theme";
import { subPx } from "../utils";

const BaseNavBarSearch = ({ name, onSubmit, ...props }) => {
  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };
  const { t } = useTranslation();
  return (
    <form {...props} onSubmit={handleOnSubmit}>
      <Flex role="search">
        <Input
          id="navbar-search"
          type="search"
          aria-labelledby={name}
          required
          placeholder={t("search nulogy")}
        />
        <button id={name} aria-label={name}>
          <Icon icon="search" />
        </button>
      </Flex>
    </form>
  );
};

const NavBarSearch = styled(BaseNavBarSearch)({
  background: theme.colors.lightBlue,
  borderRadius: theme.radii.medium,
  height: theme.space.x5,
  minWidth: "7em",
  width: "100%",
  button: {
    padding: subPx(theme.space.x1),
    color: theme.colors.blackBlue,
    background: "transparent",
    border: "solid 1px transparent",
    borderRadius: theme.radii.medium,
    minWidth: theme.space.x5,
    ":focus": {
      color: theme.colors.white,
      background: darken(0.1, theme.colors.blue),
      border: `solid 1px ${theme.colors.lightBlue}`,
      outline: "none",
      boxShadow: "none",
    },
    svg: {
      display: "block",
    },
  },
  Input: {
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
    "&[type='search']": {
      "-webkit-appearance": "textfield",
      "::-webkit-search-decoration": {
        "-webkit-appearance": "none",
      },
    },
  },
});

BaseNavBarSearch.propTypes = {
  name: PropTypes.string,
  onSubmit: PropTypes.func,
};

BaseNavBarSearch.defaultProps = {
  name: "global-search",
  onSubmit: () => {},
};

export default NavBarSearch;

import React from "react";
import styled from "styled-components";
import { components } from "react-select";

import theme from "../theme";
import { subPx } from "../utils";

const StyledOption = styled.div(({ isSelected, isFocused }) => ({
  padding: subPx(theme.space.x1),
  fontWeight: isSelected ? theme.fontWeights.medium : theme.fontWeights.normal,
  background: isFocused ? theme.colors.lightBlue : null,
  minHeight: theme.space.x4,
  "&:last-child": {
    borderBottomLeftRadius: theme.radii.medium,
    borderBottomRightRadius: theme.radii.medium
  },
  "&:hover": {
    background: theme.colors.lightBlue,
    minHeight: theme.space.x4
  },
  div: {
    background: "none"
  }
}));

const SelectOption = props => (
  <StyledOption {...props}>
    <components.Option {...props} />
  </StyledOption>
);

export default SelectOption;

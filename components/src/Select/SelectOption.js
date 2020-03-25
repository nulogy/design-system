import React from "react";
import styled from "styled-components";
import { components } from "react-select";

import theme from "../theme";
import { subPx } from "../utils";

const StyledOption = styled.div(({ isSelected, isFocused }) => ({
  "&:last-child": {
    borderBottomLeftRadius: theme.radii.medium,
    borderBottomRightRadius: theme.radii.medium
  },
  div: {
    padding: subPx(theme.space.x1),
    fontWeight: isSelected ? theme.fontWeights.medium : theme.fontWeights.normal,
    background: isFocused ? theme.colors.lightBlue : null,
    minHeight: theme.space.x4,
    cursor: "pointer",
    "&:hover": {
      background: theme.colors.lightBlue,
      minHeight: theme.space.x4
    }
  }
}));

const SelectOption = props => (
  <StyledOption {...props} cx={null} data-testid="select-option">
    <components.Option {...props} />
  </StyledOption>
);

export default SelectOption;

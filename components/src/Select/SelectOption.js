import React from "react";
import styled from "styled-components";
import { components } from "react-windowed-select";

import { typography } from "styled-system";
import { subPx } from "../utils";

const StyledOption = styled.div(typography, ({ isSelected, isFocused, theme }) => ({
  "&:last-child": {
    borderBottomLeftRadius: theme.radii.medium,
    borderBottomRightRadius: theme.radii.medium
  },
  // eslint-disable-next-line no-nested-ternary
  background: isSelected ? theme.colors.darkBlue : isFocused ? theme.colors.lightBlue : null,
  div: {
    padding: subPx(theme.space.x1),
    fontWeight: isSelected ? theme.fontWeights.medium : theme.fontWeights.normal,
    color: isSelected ? theme.colors.white : theme.colors.black,
    minHeight: theme.space.x4,
    minWidth: "max-content",
    whiteSpace: "nowrap",
    "&:hover": {
      background: !isSelected ? theme.colors.lightBlue : null,
      cursor: "pointer"
    }
  }
}));

const SelectOption = props => (
  <StyledOption {...props} cx={null} data-testid="select-option">
    <components.Option {...props} />
  </StyledOption>
);

export default SelectOption;

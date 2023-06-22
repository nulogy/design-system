import React from "react";
import styled from "styled-components";
import { components } from "react-windowed-select";
import { typography } from "styled-system";
import { subPx } from "../utils";
import { DefaultNDSThemeType } from "../theme.type";
import { stylesForSize } from "./customReactSelectStyles";

type SelectOptionProps = {
  theme?: DefaultNDSThemeType;
} & { [key: string]: any };

const StyledOption = styled.div<SelectOptionProps>(
  typography,
  ({ isSelected, isFocused, theme }) => ({
    "&:last-child": {
      borderBottomLeftRadius: theme.radii.medium,
      borderBottomRightRadius: theme.radii.medium,
    },
    div: {
      height: "auto",
      padding: subPx(theme.space.x1),
      fontWeight: isSelected ? theme.fontWeights.medium : theme.fontWeights.normal,
      background: isFocused ? theme.colors.lightBlue : null,
      minHeight: theme.space.x4,
      minWidth: "max-content",
      whiteSpace: "nowrap",
      "&:hover": {
        background: !isSelected ? theme.colors.lightBlue : null,
        cursor: "pointer",
      },
    },
  }),
  ({ theme, selectProps }) =>
    stylesForSize(
      {
        large: {
          div: {
            padding: subPx(theme.space.x2),
          },
        },
        medium: {
          div: {
            padding: subPx(theme.space.x1),
          },
        },
      },
      selectProps.size
    )
);

export const SelectOption = (props) => {
  return (
    <StyledOption {...props} cx={null} data-testid="select-option">
      <components.Option {...props} />
    </StyledOption>
  );
};

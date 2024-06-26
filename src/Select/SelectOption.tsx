import React from "react";
import styled from "styled-components";
import { components, GroupBase, OptionProps } from "react-select";
import { typography } from "styled-system";
import { subPx } from "../utils";
import { ComponentSize, useComponentSize } from "../NDSProvider/ComponentSizeContext";
import { stylesForSize } from "./customReactSelectStyles";
import { NDSOption } from "./Select";

type StyledOptionProps = {
  isSelected: boolean;
  isFocused: boolean;
  size: ComponentSize;
};

export const StyledOption = styled.div<StyledOptionProps>(
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
  ({ theme, size }) =>
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
      size
    )
);

export type SelectOptionProps<
  Option = NDSOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = OptionProps<Option, IsMulti, Group> & {
  size?: ComponentSize;
};

export function SelectOption<
  Option = NDSOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: SelectOptionProps<Option, IsMulti, Group>) {
  const size = useComponentSize(props.size);

  return (
    <StyledOption isSelected={props.isSelected} isFocused={props.isFocused} size={size} data-testid="select-option">
      <components.Option {...props}>{props.children}</components.Option>
    </StyledOption>
  );
}

import React from "react";
import styled from "styled-components";
import { components, GroupBase, OptionProps } from "react-select";
import { typography } from "styled-system";
import { subPx } from "../utils";
import { variant } from "../StyledProps";
import { NDSOption } from "./Select";

type StyledOptionProps = {
  isSelected: boolean;
  isFocused: boolean;
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
  ({ theme }) =>
    variant({
      variants: {
        touch: {
          div: {
            padding: subPx(theme.space.x1),
          },
        },
        desktop: {
          div: {
            padding: subPx(theme.space.x1),
          },
        },
      },
    })
);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SelectOptionProps<
  Option = NDSOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
> extends OptionProps<Option, IsMulti, Group> {}

export function SelectOption<
  Option extends NDSOption = NDSOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: SelectOptionProps<Option, IsMulti, Group>) {
  return (
    <StyledOption isSelected={props.isSelected} isFocused={props.isFocused} data-testid="select-option">
      <components.Option {...props}>{props.children}</components.Option>
    </StyledOption>
  );
}

import React from "react";
import styled from "styled-components";
import { components, GroupBase, OptionProps } from "react-select";
import { typography } from "styled-system";
import { subPx } from "../utils";
import { ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { variant } from "../StyledProps";
import { NDSOption } from "./Select";

type StyledOptionProps = {
  isSelected: boolean;
  isFocused: boolean;
  variant: ComponentVariant;
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

export type SelectOptionProps<
  Option = NDSOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = OptionProps<Option, IsMulti, Group> & {
  variant?: ComponentVariant;
};

export function SelectOption<
  Option = NDSOption,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: SelectOptionProps<Option, IsMulti, Group>) {
  const variant = useComponentVariant(props.variant);

  return (
    <StyledOption
      isSelected={props.isSelected}
      isFocused={props.isFocused}
      variant={variant}
      data-testid="select-option"
    >
      <components.Option {...props}>{props.children}</components.Option>
    </StyledOption>
  );
}

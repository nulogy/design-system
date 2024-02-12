import React from "react";
import styled from "styled-components";
import { components, OptionProps } from "react-windowed-select";
import { typography } from "styled-system";
import { GroupBase } from "react-select";
import { subPx } from "../utils";
import { ComponentSize } from "../NDSProvider/ComponentSizeContext";
import { stylesForSize } from "./customReactSelectStyles";

type SelectOptionProps = {
  isSelected: boolean;
  isFocused: boolean;
  size: ComponentSize;
};

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

export function SelectOption<Option, IsMulti extends boolean, Group extends GroupBase<Option>>(
  props: OptionProps<Option, IsMulti, Group> & { size: ComponentSize }
) {
  return (
    <StyledOption
      isSelected={props.isSelected}
      isFocused={props.isFocused}
      size={props.size}
      data-testid="select-option"
    >
      <components.Option {...props} />
    </StyledOption>
  );
}

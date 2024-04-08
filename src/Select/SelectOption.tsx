import React from "react";
import styled from "styled-components";
import { components, OptionProps } from "react-windowed-select";
import { typography } from "styled-system";
import { subPx } from "../utils";
import { ComponentSize, useComponentSize } from "../NDSProvider/ComponentSizeContext";
import { stylesForSize } from "./customReactSelectStyles";

type SelectOptionProps = {
  isSelected: boolean;
  isFocused: boolean;
  size: ComponentSize;
};

export const StyledOption = styled.div<SelectOptionProps>(
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

interface CustomOptionProps extends OptionProps {
  size?: ComponentSize;
}

export function SelectOption(props: CustomOptionProps) {
  const size = useComponentSize(props.size);

  return (
    <StyledOption isSelected={props.isSelected} isFocused={props.isFocused} size={size} data-testid="select-option">
      <components.Option {...props}>{props.children}</components.Option>
    </StyledOption>
  );
}

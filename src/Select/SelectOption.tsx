import React from "react";
import styled from "styled-components";
import { components, OptionProps } from "react-windowed-select";
import { typography } from "styled-system";
import { subPx } from "../utils";
import { ComponentVariant, useComponentVariant } from "../NDSProvider/ComponentVariantContext";
import { stylesForVariant } from "./customReactSelectStyles";

type SelectOptionProps = {
  isSelected: boolean;
  isFocused: boolean;
  variant: ComponentVariant;
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
  ({ theme, variant }) =>
    stylesForVariant(
      {
        touch: {
          div: {
            // padding: subPx(theme.space.x2),
            padding: subPx(theme.space.x1),
          },
        },
        desktop: {
          div: {
            padding: subPx(theme.space.x1),
          },
        },
      },
      variant
    )
);

interface CustomOptionProps extends OptionProps {
  variant?: ComponentVariant;
}

export function SelectOption(props: CustomOptionProps) {
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

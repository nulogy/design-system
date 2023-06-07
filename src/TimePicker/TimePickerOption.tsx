import React from "react";
import styled, { CSSObject } from "styled-components";
import { ComponentSize } from "../Input/InputField";
import { DefaultNDSThemeType } from "../theme.type";

type TimePickerOptionProps = React.ComponentProps<"li"> & {
  size?: ComponentSize;
  isSelected: boolean;
  isFocused: boolean;
  isClosest: boolean;
};

const TimePickerOption = styled.li<TimePickerOptionProps>(
  ({ theme, isSelected }) => ({
    marginBottom: "0px",
    backgroundColor: isSelected ? theme.colors.darkBlue : theme.colors.white,
    color: isSelected ? theme.colors.white : theme.colors.black,
    "&:hover": {
      background: !isSelected && theme.colors.lightBlue,
    },
  }),
  ({ size, theme }) => cssForSize(size, theme),
  ({ isSelected, theme, isFocused, isClosest }) => {
    if (isFocused || isClosest) {
      return {
        background: !isSelected && theme.colors.lightBlue,
        outline: "none",
      };
    }
  }
);

const cssForSize = (size: ComponentSize, theme: DefaultNDSThemeType): CSSObject => {
  switch (size) {
    case "large":
      return {
        padding: theme.space.x2,
      };

    case "medium":
    default:
      return {
        padding: theme.space.x1,
      };
  }
};

export default TimePickerOption;

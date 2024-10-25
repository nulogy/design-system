import React from "react";
import styled from "styled-components";
import { variant } from "styled-system";
import { ComponentVariant } from "../NDSProvider/ComponentVariantContext";

type TimePickerOptionProps = React.ComponentProps<"li"> & {
  variant?: ComponentVariant;
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
    padding: theme.space.x1,
  }),
  variant({
    prop: "foo",
    variants: {
      touch: {
        px: "x1",
        py: "x2",
      },
      medium: {
        p: "x1",
      },
    },
  }),
  ({ isSelected, theme, isFocused, isClosest }) => {
    if (isFocused || isClosest) {
      return {
        background: !isSelected && theme.colors.lightBlue,
        outline: "none",
      };
    }
  }
);

export default TimePickerOption;

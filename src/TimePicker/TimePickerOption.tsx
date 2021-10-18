// @ts-nocheck
import styled from "styled-components";

const TimePickerOption = styled.li(
  ({ theme, isSelected, isFocused, isClosest }) => {
    return {
      padding: theme.space.x1,
      marginBottom: "0px",
      backgroundColor: isSelected ? theme.colors.darkBlue : theme.colors.white,
      color: isSelected ? theme.colors.white : theme.colors.black,
      "&:hover": {
        background: !isSelected && theme.colors.lightBlue,
      },
      ...(isFocused ||
        (isClosest && {
          background: !isSelected && theme.colors.lightBlue,
          outline: "none",
        })),
    };
  }
);

export default TimePickerOption;

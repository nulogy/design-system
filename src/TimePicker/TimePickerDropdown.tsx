// @ts-nocheck
import styled from "styled-components";

const TimePickerDropdown = styled.ul(({ theme, isOpen }) => {
  return {
    position: "absolute",
    width: "100%",
    background: theme.colors.white,
    listStyle: "none",
    margin: "0px",
    padding: "0px",
    maxHeight: "200px",
    overflow: "auto",
    boxShadow: theme.shadows.focus,
    border: "1px solid",
    borderColor: theme.colors.blue,
    borderBottomLeftRadius: theme.radii.medium,
    borderBottomRightRadius: theme.radii.medium,
    display: isOpen ? "block" : "none",
    zIndex: theme.zIndices.content,
    scrollBehavior: "smooth",
  };
});

export default TimePickerDropdown;

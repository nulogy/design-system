import styled from "styled-components";

const getHoverBackground = (currentPage, disabled, theme) => {
  if (currentPage) {
    return theme.colors.darkBlue;
  }
  if (disabled) {
    return "inital";
  }
  return theme.colors.lightGrey;
};

const PaginationButton = styled.button(
  ({ theme, disabled, currentPage }: any) => ({
    fontSize: theme.fontSizes.small,
    padding: `${theme.space.x1} ${theme.space.x2}`,
    lineHeight: theme.lineHeights.smallTextBase,
    display: "flex",
    borderRadius: theme.radii.medium,
    border: `1px solid ${
      currentPage ? theme.colors.darkBlue : theme.colors.lightGrey
    }`,
    color: disabled ? theme.colors.grey : theme.colors.black,
    "&:not(:last-child)": {
      marginRight: theme.space.x2,
    },
    cursor: disabled ? "default" : "pointer",
    "&:hover": {
      background: getHoverBackground(currentPage, disabled, theme),
    },
  })
);

export default PaginationButton;

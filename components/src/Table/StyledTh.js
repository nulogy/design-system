import styled from "styled-components";

const StyledTh = styled.th(({ width, compact, theme }) => {
  const padding = compact ? theme.space.x1 : theme.space.x2;
  return {
    fontWeight: "normal",
    textAlign: "left",
    padding: `${padding} 0`,
    paddingRight: padding,
    color: theme.colors.darkGrey,
    "&:first-child": {
      paddingLeft: padding
    },
    width: width || "auto"
  };
});

export default StyledTh;

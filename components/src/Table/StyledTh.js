import styled from "styled-components";
import theme from "../theme";

const StyledTh = styled.th(({ width, compact }) => {
  const padding = compact ? theme.space.x1 : theme.space.x2;
  return {
    fontWeight: "normal",
    textAlign: "left",
    padding: `${padding} 0`,
    paddingRight: padding,
    color: theme.colors.darkGrey,
    "&:first-of-type": {
      paddingLeft: padding
    },
    width: width || "auto"
  };
});

export default StyledTh;

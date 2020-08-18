import styled from "styled-components";

const stickyStyles = theme => ({
  position: "sticky",
  top: 0,
  background: "white",
  boxShadow: "0px 1px 0px rgba(0,0,0,.1)",
  zIndex: theme.zIndex.content
});

const StyledTh = styled.th(({ width, compact, theme, sticky }) => {
  const padding = compact ? theme.space.x1 : theme.space.x2;
  return {
    fontWeight: "normal",
    textAlign: "left",
    padding: `${padding} 0`,
    paddingRight: padding,
    color: theme.colors.darkGrey,
    ...(sticky && stickyStyles(theme)),
    "&:first-child": {
      paddingLeft: padding
    },
    width: width || "auto"
  };
});

export default StyledTh;

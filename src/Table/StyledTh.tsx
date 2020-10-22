import styled, { CSSObject } from "styled-components";
import { ThemeType } from "../theme.type";
const stickyStyles = (theme: ThemeType): CSSObject => ({
  position: "sticky",
  top: 0,
  background: "white",
  boxShadow: "0px 1px 0px rgba(0,0,0,.1)",
  zIndex: theme.zIndex.content
});

type StyledThProps = {
  width?: any;
  compact?: boolean;
  theme?: ThemeType;
  sticky?: any;
};
const StyledTh = styled.th(
  ({ width, compact, theme, sticky }: StyledThProps): CSSObject => {
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
  }
);
export default StyledTh;

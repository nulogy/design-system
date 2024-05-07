import styled, { CSSObject, CSSProperties } from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";

const stickyStyles = (theme: DefaultNDSThemeType): CSSObject => ({
  position: "sticky",
  top: 0,
  background: "white",
  boxShadow: "0px 1px 0px rgba(0,0,0,.1)",
  zIndex: theme.zIndices.tableHeader,
});

type StyledThProps = {
  width?: CSSProperties["width"];
  compact?: boolean;
  theme?: DefaultNDSThemeType;
  sticky?: boolean;
};

const StyledTh = styled.th<StyledThProps>(({ width, compact, theme, sticky }) => {
  const padding = compact ? theme.space.x1 : theme.space.x2;

  return {
    fontWeight: "normal",
    textAlign: "left",
    padding: `${padding} 0`,
    paddingRight: padding,
    color: theme.colors.darkGrey,
    ...(sticky && stickyStyles(theme)),
    "&:first-child": {
      paddingLeft: padding,
    },
    width: width || "auto",
  };
});

export default StyledTh;

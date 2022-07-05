import styled, { CSSObject } from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";
import { Flex } from "../Flex";

export type NavBarBackgroundProps = {
  backgroundColor?: string;
  theme?: DefaultNDSThemeType;
  height: string;
};

const NavBarBackground = styled(Flex)(
  ({ height, backgroundColor, theme }: NavBarBackgroundProps): CSSObject => ({
    background: backgroundColor,
    padding: `0 ${theme.space.x3}`,
    borderBottom: `1px solid ${theme.colors.lightGrey}`,
    alignItems: "center",
    height: height,
    zIndex: theme.zIndices.navBar,
    position: "relative",
  })
);

export default NavBarBackground;

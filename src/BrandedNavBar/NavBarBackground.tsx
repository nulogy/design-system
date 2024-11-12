import styled, { CSSObject } from "styled-components";
import { DefaultNDSThemeType } from "../theme";
import { Flex } from "../Flex";
import { addStyledProps, StyledProps } from "../StyledProps";

export type NavBarBackgroundProps = {
  theme?: DefaultNDSThemeType;
} & StyledProps;

const NavBarBackground = styled(Flex)(
  ({ theme }: NavBarBackgroundProps): CSSObject => ({
    padding: `0 ${theme.space.x3}`,
    borderBottom: `1px solid ${theme.colors.lightGrey}`,
    alignItems: "center",
    zIndex: theme.zIndices.navBar,
    position: "relative",
  }),
  addStyledProps
);

export default NavBarBackground;

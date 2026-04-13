import { type CSSObject, styled } from "styled-components";
import { Flex } from "../Flex";
import { addStyledProps, type StyledProps } from "../StyledProps";
import type { DefaultNDSThemeType } from "../theme";

/** @deprecated The BrandedNavBar component is deprecated. Use the Navigation component instead. */
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
  addStyledProps,
);

/** @deprecated The BrandedNavBar component is deprecated. Use the Navigation component instead. */
export default NavBarBackground;

import styled from "styled-components";
import { transparentize } from "polished";
import { Flex } from "../Flex";
import { FlexProps } from "../Flex/Flex";
import { ThemeType } from "../theme.type";

type OverlayProps = FlexProps & {
  dark?: boolean;
  theme?: ThemeType;
};
const Overlay: React.SFC<OverlayProps> = styled(Flex)(({ dark, theme }: OverlayProps) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: theme.zIndex.overlay,
  backgroundColor: dark ? transparentize(0.5, theme.colors.blackBlue) : transparentize(0.05, theme.colors.white)
}));
Overlay.defaultProps = {
  position: "fixed",
  justifyContent: "center",
  alignItems: "center",
  dark: false
};
export default Overlay;

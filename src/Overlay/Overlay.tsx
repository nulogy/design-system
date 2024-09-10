import styled from "styled-components";
import { transparentize } from "polished";
import { Flex } from "../Flex";
import { FlexProps } from "../Flex/Flex";

interface Props extends FlexProps {
  dark?: boolean;
}

const Overlay = styled(Flex)<Props>(({ dark = false, theme }) => ({
  position: "fixed",
  justifyContent: "center",
  alignItems: "center",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: theme.zIndices.overlay,
  backgroundColor: dark ? transparentize(0.5, theme.colors.blackBlue) : transparentize(0.05, theme.colors.white),
}));

export default Overlay;

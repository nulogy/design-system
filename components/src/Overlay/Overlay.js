import PropTypes from "prop-types";
import styled from "styled-components";
import { transparentize } from "polished";
import { Flex } from "../Flex";

const Overlay = styled(Flex)(({ dark, theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: theme.zIndex.overlay,
  backgroundColor: dark ? transparentize(0.5, theme.colors.blackBlue) : transparentize(0.05, theme.colors.white)
}));

Overlay.propTypes = {
  dark: PropTypes.bool
};

Overlay.defaultProps = {
  position: "fixed",
  justifyContent: "center",
  alignItems: "center",
  dark: false
};

export default Overlay;

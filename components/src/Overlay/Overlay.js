import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { transparentize } from "polished";
import theme from "../theme";

const Overlay = styled.div({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: transparentize(0.05, theme.colors.white),
  zIndex: theme.zIndex.overlay
});

Overlay.propTypes = {};

Overlay.defaultProps = {};

export default Overlay;

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../theme";

const ButtonSet = styled.div({
  display: "flex",
  width: "100%",
  "button:not(:last-child)": {
    marginRight: theme.space.x1
  }
});

export default ButtonSet;

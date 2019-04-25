import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";
import Card from "./Card";
import IconicButton from "../Button/IconicButton";
import theme from "../theme";

const CPCard = styled(props => <Card { ...props } />)(
  space,
  {
    "&:hover": {
      backgroundColor: theme.colors.lightBlue,
      cursor: "grab",
    },
    "&:active": {
      backgroundColor: theme.colors.whiteGrey,
      opacity: 0.6667,
      cursor: "grabbing",
    },
    [`${IconicButton}`]: {
      position: "absolute",
      right: theme.space.none,
      top: theme.space.x1,
    },
  },
);

CPCard.propTypes = {
  children: PropTypes.node,
  ...space.PropTypes,
};

CPCard.defaultProps = {
  children: [],
};

export default CPCard;

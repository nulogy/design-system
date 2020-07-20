import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import propTypes from "@styled-system/prop-types";
import PropTypes from "prop-types";
import { Box } from "../Box";
import Card from "./Card";

const UnstyledCardSet = ({ children, ...props }) => <Box {...props}>{children}</Box>;

const CardSet = styled(UnstyledCardSet)(space, ({ theme }) => ({
  [`${Card}`]: {
    marginBottom: theme.space.x1,
    "&:last-child": {
      marginBottom: theme.space.none
    }
  }
}));

UnstyledCardSet.propTypes = {
  children: PropTypes.node,
  ...propTypes.space
};

UnstyledCardSet.defaultProps = {
  children: []
};

export default CardSet;

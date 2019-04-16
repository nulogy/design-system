import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import PropTypes from "prop-types";
import {
  Box,
} from "ComponentsRoot";
import theme from "../theme";

const UnstyledCard = ({
  children,
  ...props
}) => (
  <Box { ...props }>
    { children }
  </Box>
);

const Card = styled(UnstyledCard)(
  space,
  {
    backgroundColor: theme.colors.whiteGrey,
    borderRadius: theme.radii.medium,
    padding: theme.space.x2,
    boxShadow: theme.boxShadows.small,
    position: "relative",
  },
);

UnstyledCard.propTypes = {
  children: PropTypes.node,
  ...space.PropTypes,
};

UnstyledCard.defaultProps = {
  children: [],
};

export default Card;

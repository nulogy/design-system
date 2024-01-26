import React from "react";
import styled from "styled-components";
import { space } from "styled-system";
import { Box } from "../Box";
import { BoxProps } from "../Box/Box";
import Card from "./Card";

const UnstyledCardSet = ({ children = [], ...props }: BoxProps) => <Box {...props}>{children}</Box>;

const CardSet = styled(UnstyledCardSet)(space, ({ theme }) => ({
  [`${Card}`]: {
    marginBottom: theme.space.x1,
    "&:last-child": {
      marginBottom: theme.space.none,
    },
  },
}));

export default CardSet;

import React from "react";
import styled, { CSSObject } from "styled-components";
import { color } from "styled-system";
import { Text } from "../Type";
import { TextProps } from "../Type/Text";

const DropdownText: React.FC<TextProps> = styled(Text)(
  ({ theme }: TextProps): CSSObject => ({
    color: theme.colors.darkGrey,
    fontWeight: theme.fontWeights.medium,
    display: "block",
    width: "100%",
    border: "none",
    textAlign: "left",
    backgroundColor: "transparent",
    transition: ".2s",
    padding: `${theme.space.x1} ${theme.space.x2}`,
  }),
  color
);

export default DropdownText;

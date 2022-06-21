import React from "react";
import styled, { CSSObject } from "styled-components";
import { Text } from "../Type";
import { TextProps } from "../Type/Text";
import { addStyledProps } from "../StyledProps";

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
  addStyledProps
);

export default DropdownText;

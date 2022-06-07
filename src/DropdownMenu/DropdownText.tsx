import React from "react";
import styled, { CSSObject } from "styled-components";
import { DefaultNDSThemeType } from "../theme.type";
import { Text } from "../Type";

type DropdownTextProps = {
  theme?: DefaultNDSThemeType;
  color?: string;
};

const DropdownText: React.FC<DropdownTextProps> = styled(Text)(
  ({ theme }: DropdownTextProps): CSSObject => ({
    color: theme.colors.darkGrey,
    display: "block",
    width: "100%",
    border: "none",
    textAlign: "left",
    backgroundColor: "transparent",
    transition: ".2s",
    padding: `${theme.space.x1} ${theme.space.x2}`,
  })
);

export default DropdownText;

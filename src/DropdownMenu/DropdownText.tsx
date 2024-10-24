import styled, { CSSObject } from "styled-components";
import { Text } from "../Type";
import type { TextProps } from "../Type";
import { addStyledProps } from "../StyledProps";

const DropdownText = styled(Text)<TextProps>(
  ({ theme }): CSSObject => ({
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

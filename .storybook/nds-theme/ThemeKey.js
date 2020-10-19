import styled from "styled-components";
import { Text } from "../../src";

const ThemeKey = styled(Text)(({ theme }) => ({
  display: "inline-block",
  width: "250px",
  fontSize: theme.fontSizes.small,
  fontFamily: `${theme.fonts.mono} !important`,
  marginRight: theme.space.x3
}));

export default ThemeKey;

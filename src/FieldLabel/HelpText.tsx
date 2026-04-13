import { styled } from "styled-components";
import { Link } from "../Link";
import { Text } from "../Type";

const HelpText = styled(Text)(({ theme }) => ({
  fontSize: theme.fontSizes.small,
  lineHeight: theme.lineHeights.smallTextBase,
  [`${Link}`]: {
    fontSize: theme.fontSizes.small,
  },
}));

export default HelpText;

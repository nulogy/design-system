import styled from "styled-components";
import { Text } from "../Type";
import { Link } from "../Link";

const HelpText = styled(Text)(({ theme }) => ({
  fontSize: theme.fontSizes.small,
  lineHeight: theme.lineHeights.smallTextBase,
  [`${Link}`]: {
    fontSize: theme.fontSizes.small,
  },
}));

export default HelpText;

import React from "react";
import styled from "styled-components";
import { Text } from "../Type";
import { Link } from "../Link";
const HelpTextContent = styled(Text)(({ theme }) => ({
  fontSize: theme.fontSizes.small,
  lineHeight: theme.lineHeights.smallTextBase,
  [`${Link}`]: {
    fontSize: theme.fontSizes.small,
  },
}));
const HelpText: React.SFC<any> = (props) => <HelpTextContent {...props} />;
HelpText.defaultProps = {
  children: null,
};
export default HelpText;

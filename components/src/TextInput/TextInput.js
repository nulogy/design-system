import React from "react";
import theme from "../theme";
import InputField from "./InputField";
import Text from "../Type/Text";
import Box from "../Box/Box";

// TEMPORARY TextInput
const TextInput = props => (
  <Box { ...props }>
    <Text mb={ 0 } fontSize={ theme.fontSizes[1] } lineHeight={ theme.lineHeights.smallTextBase }>I am helping</Text>
    <Text
      mb={ 0 } fontSize="12px" lineHeight="16px"
      color="darkGrey"
    >(DD-MM-YYY)
    </Text>
    <InputField />
  </Box>
);

TextInput.defaultProps = {
  theme,
  p: 3,
};

export default TextInput;

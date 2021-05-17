import React from "react";
import { Text } from "../Type";
import { TextProps } from "../Type/Text";

const RequirementText = (props: TextProps) => (
  <Text inline ml="x1" fontSize="12px" color="darkGrey" {...props} />
);

export default RequirementText;

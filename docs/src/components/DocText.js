import { Text } from "@nulogy/components";
import React from "react";

const DocText = ({ children, ...props }) => (
  <Text mb={ 4 } { ...props }>{children}</Text>
);

export default DocText;

import PropTypes from "prop-types";
import { Text } from "@nulogy/components";
import React from "react";

const DocText = ({ children, ...props }) => (
  <Text mb="x3" {...props}>
    {children}
  </Text>
);

DocText.propTypes = {
  children: PropTypes.node.isRequired
};

export default DocText;

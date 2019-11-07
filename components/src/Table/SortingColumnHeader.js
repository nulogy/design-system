import React from "react";
import PropTypes from "prop-types";
import { Text, Flex, IconicButton } from "..";

const SortingColumnHeader = ({ onChange, label, ascending, active }) => (
  <Flex alignItems="center">
    <Text color={active ? "blue" : "black"}>{label}</Text>
    <IconicButton icon={ascending ? "downArrow" : "upArrow"} onClick={onChange} />
  </Flex>
);

SortingColumnHeader.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
  ascending: PropTypes.bool,
  active: PropTypes.bool
};

SortingColumnHeader.defaultProps = {
  label: "",
  ascending: false,
  active: false
};

export default SortingColumnHeader;

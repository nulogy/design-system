import React from "react";
import PropTypes from "prop-types";

import { Text } from "../Type";
import { Flex } from "../Flex";
import { Box } from "../Box";
import { FieldLabel } from "../FieldLabel";
import { FieldLabelDefaultProps, FieldLabelProps } from "../FieldLabel/FieldLabel.type";
import { InlineValidation } from "../Validation";

const RangeContainer = ({ labelProps, startComponent, endComponent, errorMessages, ...props }) => (
  <>
    <FieldLabel {...labelProps} {...props}>
      <Box
        display="inline-flex"
        justifyContent="center"
        alignItems="flex-start"
        mb={errorMessages.length ? "x1" : "x3"}
      >
        {startComponent}
        <Flex px="x2" alignItems="center" maxHeight="38px">
          <Text>-</Text>
        </Flex>
        {endComponent}
      </Box>
    </FieldLabel>
    {errorMessages.map(errorMessage => (
      <InlineValidation key={errorMessage} errorMessage={errorMessage} />
    ))}
  </>
);

RangeContainer.propTypes = {
  labelProps: PropTypes.shape(FieldLabelProps),
  startComponent: PropTypes.node,
  endComponent: PropTypes.node,
  errorMessages: PropTypes.arrayOf(PropTypes.string)
};

RangeContainer.defaultProps = {
  labelProps: {
    ...FieldLabelDefaultProps,
    labelText: "Range"
  },
  startComponent: null,
  endComponent: null,
  errorMessages: []
};
export default RangeContainer;

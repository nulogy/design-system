import React from "react";
import propTypes from "@styled-system/prop-types";
import { Text } from "../Type";
import { Flex } from "../Flex";
import { Box } from "../Box";
import { FieldLabel } from "../FieldLabel";
import { FieldLabelDefaultProps } from "../FieldLabel/FieldLabel.type";
import { InlineValidation } from "../Validation";
import { getSubset, omitSubset } from "../utils/subset";
type RangeContainerProps = {
  labelProps?: any;
  startComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  errorMessages?: (string | undefined)[];
};
const RangeContainer: React.SFC<RangeContainerProps> = ({
  labelProps,
  startComponent,
  endComponent,
  errorMessages = [],
  ...props
}) => {
  const spaceProps = getSubset(props, propTypes.space);
  const restProps = omitSubset(props, propTypes.space);
  return <Box {...spaceProps}>
    <FieldLabel {...labelProps} {...restProps} />
    <Box
      display="inline-flex"
      justifyContent="center"
      alignItems="flex-start"
      mt="x1"
      mb={errorMessages.length ? "x1" : "x3"}
    >
      {startComponent}
      <Flex px="half" alignItems="center" maxHeight="38px">
        <Text>-</Text>
      </Flex>
      {endComponent}
    </Box>
    {errorMessages.map((errorMessage, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <InlineValidation key={i} errorMessage={errorMessage} />
    ))}
  </Box>
};
RangeContainer.defaultProps = {
  labelProps: {
    ...FieldLabelDefaultProps,
    labelText: "Range",
  },
  startComponent: null,
  endComponent: null,
  errorMessages: [],
};
export default RangeContainer;

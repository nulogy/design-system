import React from "react";
import { Text } from "../Type";
import { Flex } from "../Flex";
import { Box } from "../Box";
import { FieldLabel } from "../FieldLabel";
import { FieldLabelDefaultProps } from "../FieldLabel/FieldLabel.type";
import { InlineValidation } from "../Validation";
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
}) => (
  <>
    <FieldLabel {...labelProps} {...props} />
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
  </>
);
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

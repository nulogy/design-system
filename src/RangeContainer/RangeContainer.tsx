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
  return (
    <Flex {...spaceProps} flexDirection="column">
      <FieldLabel {...labelProps} {...restProps} />
      <Flex
        flexWrap="wrap"
        mt="x1"
        mb={errorMessages.length ? "x1" : "x3"}
      >
        <Flex>
          {startComponent}
        </Flex>
        <Flex px="half" alignItems="center" maxHeight="38px">
          <Text>-</Text>
        </Flex>
        <Flex>
          {endComponent}
        </Flex>
      </Flex>
      {errorMessages.map((errorMessage, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <InlineValidation key={i} errorMessage={errorMessage} />
      ))}
    </Flex>
  );
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

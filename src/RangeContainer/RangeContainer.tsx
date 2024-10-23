import React from "react";
import propTypes from "@styled-system/prop-types";
import { Text } from "../Type";
import { Flex } from "../Flex";
import { FieldLabel } from "../FieldLabel";
import { FieldLabelDefaultProps } from "../FieldLabel/FieldLabel.type";
import { InlineValidation } from "../Validation";
import { getSubset, omitSubset } from "../utils/subset";
import { ComponentVariant } from "../NDSProvider/ComponentVariantContext";

type RangeContainerProps = {
  labelProps?: any;
  startComponent?: React.ReactNode;
  endComponent?: React.ReactNode;
  variant?: ComponentVariant;
  errorMessages?: (string | undefined)[];
  children?: React.ReactNode;
};

const RangeContainer = ({
  startComponent,
  endComponent,
  errorMessages = [],
  labelProps = {
    ...FieldLabelDefaultProps,
    labelText: "Range",
  },
  variant,
  ...props
}: RangeContainerProps) => {
  const spaceProps = getSubset(props, propTypes.space);
  const restProps = omitSubset(props, propTypes.space);

  return (
    <Flex {...spaceProps} flexDirection="column">
      <FieldLabel {...labelProps} {...restProps} />
      <Flex flexWrap="wrap" mt="x1" mb={errorMessages.length ? "x1" : "x3"}>
        <Flex>{startComponent}</Flex>
        <Flex px="half" alignItems="flex-end" alignSelf="flex-end">
          <Text lineHeight={variant === "touch" ? "56px" : "38px"}>-</Text>
        </Flex>
        <Flex>{endComponent}</Flex>
      </Flex>
      {errorMessages.map((errorMessage, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <InlineValidation key={i} errorMessage={errorMessage} />
      ))}
    </Flex>
  );
};

export default RangeContainer;

import React from "react";
import styled from "styled-components";
import { SpaceProps } from "styled-system";
import { Text } from "../Type";
import { Icon } from "../Icon";
import { Flex } from "../Flex";
import mapErrorsToList from "./mapErrorsToList";

const Wrapper = styled.div(({ theme }) => ({
  [`${Text}`]: {
    marginBottom: theme.space.x1,
  },
  "> *:last-child": {
    marginBottom: 0,
  },
}));

type InlineValidationProps = SpaceProps & {
  className?: string;
  errorMessage?: string;
  errorList?: string[];
  children?: React.ReactNode;
};

export default function InlineValidation({
  className,
  errorMessage,
  errorList,
  children,
  ...boxProps
}: InlineValidationProps) {
  return errorMessage || errorList ? (
    <Flex className={className} color="red" {...boxProps}>
      <Icon icon="error" mr="x1" />
      <Wrapper>
        {errorMessage && <Text>{errorMessage}</Text>}
        {mapErrorsToList(errorList)}
        {children}
      </Wrapper>
    </Flex>
  ) : null;
}

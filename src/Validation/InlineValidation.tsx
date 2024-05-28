import React from "react";
import styled from "styled-components";
import { Text } from "../Type";
import { Icon } from "../Icon";
import { Flex } from "../Flex";
import mapErrorsToList from "./mapErrorsToList";
import { SpaceProps } from "styled-system";

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

const InlineValidation: React.FC<React.PropsWithChildren<InlineValidationProps>> = ({
  className,
  errorMessage,
  errorList,
  children,
  ...boxProps
}) =>
  errorMessage || errorList ? (
    <Flex className={className} color="red" {...boxProps}>
      <Icon icon="error" mr="x1" />
      <Wrapper>
        {errorMessage && <Text>{errorMessage}</Text>}
        {mapErrorsToList(errorList)}
        {children}
      </Wrapper>
    </Flex>
  ) : null;

InlineValidation.defaultProps = {
  className: undefined,
  errorMessage: undefined,
  errorList: undefined,
  children: undefined,
};
export default InlineValidation;

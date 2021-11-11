import React from "react";
import { Box } from "../Box";
import type { BoxProps } from "../Box/Box";
import { Flex } from "../Flex";
import { Heading1 } from "../Type";

type HeaderProps = BoxProps & {
  breadcrumbs?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({
  background = "whiteGrey",
  breadcrumbs,
  title,
  children,
  ...rest
}) => (
  <Box p="x3" background={background} {...rest}>
    {breadcrumbs}
    <Flex alignItems="center" mt="x1">
      {title && <Heading1 mb="0">{title}</Heading1>}
      {children && (
        <Box ml="x1" flexGrow={1}>
          {children}
        </Box>
      )}
    </Flex>
  </Box>
);

export default Header;

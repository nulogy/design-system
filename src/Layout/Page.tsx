import React from "react";

import { Box } from "../Box";
import { Flex } from "../Flex";
import { Heading1 } from "../Type";
import { FlexProps } from "../Flex/Flex";

type PageProps = FlexProps & {
  breadcrumbs?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
  headerContent?: React.ReactNode;
  fullHeight?: boolean
};

export const Page = ({ breadcrumbs, title, children, headerContent, fullHeight, ...props }: PageProps) => (
  <Flex flexDirection="column" py="x3" px="x3" flexGrow={fullHeight ? 1 : 0} {...props}>
    {breadcrumbs}
    <Flex alignItems="center">
      {title && (
        <Heading1 mb="x6" mt="x2">
          {title}
        </Heading1>
      )}
      {headerContent && (
        <Box mb="x6" mt="x2" flexGrow={1} ml="x1">
          {headerContent}
        </Box>
      )}
    </Flex>
    {children}
  </Flex>
);

export default Page;

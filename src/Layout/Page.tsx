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
  headerBackground?: string;
};

export const Page = ({
  breadcrumbs,
  title,
  children,
  headerContent,
  headerBackground = "whiteGrey",
  ...props
}: PageProps) => (
  <Flex flexDirection="column" {...props}>
    <Box p="x3" background={headerBackground}>
      {breadcrumbs}
      <Flex alignItems="center" mt="x1">
        {title && <Heading1 mb="0">{title}</Heading1>}
        {headerContent && (
          <Box ml="x1" flexGrow={1}>
            {headerContent}
          </Box>
        )}
      </Flex>
    </Box>
    <Box p="x3">{children}</Box>
  </Flex>
);
export default Page;

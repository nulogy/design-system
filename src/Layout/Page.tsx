import React from "react";

import { Box } from "../Box";
import { Flex } from "../Flex";
import { FlexProps } from "../Flex/Flex";

type PageProps = FlexProps & {
  children?: React.ReactNode;
  header?: React.ReactNode;
};

export const Page: React.FC<PageProps> = ({ header, children, ...rest }) => (
  <Flex flexDirection="column" {...rest}>
    {header}
    <Box p="x3">{children}</Box>
  </Flex>
);

export default Page;

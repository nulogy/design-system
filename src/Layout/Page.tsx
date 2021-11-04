import React from "react";

import { Box } from "../Box";
import { Flex } from "../Flex";
import { FlexProps } from "../Flex/Flex";
import { BoxProps } from "../Box/Box";
import Header from "./Header";

type PageProps = FlexProps & {
  breadcrumbs?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
  headerContent?: React.ReactNode;
  headerProps?: BoxProps;
};

export const Page: React.FC<PageProps> = ({
  breadcrumbs,
  title,
  children,
  headerContent,
  headerProps,
  ...rest
}) => (
  <Flex flexDirection="column" {...rest}>
    <Header
      breadcrumbs={breadcrumbs}
      title={title}
      background={headerProps?.background}
      {...headerProps}
    >
      {headerContent}
    </Header>
    <Box p="x3">{children}</Box>
  </Flex>
);

export default Page;

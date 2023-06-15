import React from "react";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { FlexProps } from "../Flex/Flex";
import Header from "./Header";

type PageProps = FlexProps & {
  breadcrumbs?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
  headerContent?: React.ReactNode;
  fullHeight?: boolean;
  renderHeader?: () => JSX.Element;
};

export const Page: React.FC<PageProps> = ({
  breadcrumbs,
  title,
  children,
  headerContent,
  fullHeight,
  renderHeader,
  ...rest
}) => (
  <Flex flexDirection="column" flexGrow={fullHeight ? 1 : 0} {...rest}>
    {renderHeader
      ? renderHeader()
      : (breadcrumbs || title || headerContent) && (
          <Header renderBreadcrumbs={() => breadcrumbs} title={title}>
            {headerContent}
          </Header>
        )}
    <Box p="x3">{children}</Box>
  </Flex>
);

export default Page;

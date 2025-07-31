import React, { ReactNode } from "react";
import { Box } from "../Box";
import { Flex } from "../Flex";
import { FlexProps } from "../Flex/Flex";
import Header from "./Header";

interface PageProps extends FlexProps {
  breadcrumbs?: ReactNode;
  title?: string;
  children?: ReactNode;
  headerContent?: ReactNode;
  fullHeight?: boolean;
  renderHeader?: () => ReactNode;
}

export const Page = ({ breadcrumbs, title, children, headerContent, fullHeight, renderHeader, ...rest }: PageProps) => (
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

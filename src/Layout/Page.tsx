import React from "react";

import { Flex } from "../Flex";
import { Heading1 } from "../Type";

type PageProps = {
  breadcrumbs?: React.ReactNode;
  title?: string;
  children?: React.ReactNode;
  headerContent?: React.ReactNode;
};

export const Page = ({
  breadcrumbs,
  title,
  children,
  headerContent,
  ...props
}: PageProps) => (
  <>
    <Flex flexDirection="column" py="x3" px="x3" {...props}>
      {breadcrumbs}
      <Flex mb="x6" mt="x2">
        {title && (
          <Heading1 mb="none" mt="none">
            {title}
          </Heading1>
        )}
        {headerContent}
      </Flex>
      {children}
    </Flex>
  </>
);

export default Page;

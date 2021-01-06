import React from "react";

import { Flex } from "../Flex";
import { Heading1 } from "../Type";

type PageProps = {
  breadcrumbs: React.ReactNode;
  title: string;
  sideBar: React.ReactNode;
  children: React.ReactNode;
};

export const Page = ({
  breadcrumbs,
  title,
  sideBar,
  children,
  ...props
}: PageProps) => (
  <>
    <Flex flexDirection="column" py="x3" px="x3" {...props}>
      {breadcrumbs}
      {title && (
        <Heading1 mb="x6" mt="x2">
          {title}
        </Heading1>
      )}
      {children}
    </Flex>
    {sideBar}
  </>
);

export default Page;

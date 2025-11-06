import React from "react";
import { ApplicationFrame, Header, Page, Breadcrumbs, Link, Box, Text } from "../../..";

export default {
  title: "Projects/Supplier Collaboration/Materials overview/In-transit",
};

const primaryMenu = [
  { name: "Order management", href: "/" },
  { name: "Production planning", href: "/" },
  { name: "Inventory management", href: "/" },
  { name: "Quality control", href: "/" },
];

const secondaryMenu = [
  {
    name: "Materials overview",
    items: [
      { name: "Inventory summary", href: "/" },
      { name: "In-transit", href: "/" },
    ],
  },
];

export const InTransit = () => {
  const breadcrumbs = (
    <Breadcrumbs>
      <Link href="/supplier-collaboration">Supplier Collaboration</Link>
      <Link href="/supplier-collaboration/materials-overview">Materials overview</Link>
      <Text>In-transit</Text>
    </Breadcrumbs>
  );

  return (
    <>
      <style>
        {`
          /* Remove Storybook's default padding */
          .sb-show-main {
            padding: 0 !important;
          }
        `}
      </style>
      <ApplicationFrame>
        <Header breakpoints={{ medium: 1200 }} renderBreadcrumbs={() => breadcrumbs} title="In-transit" />
        <Page>
          <Box>
            <Text>In-transit content goes here...</Text>
          </Box>
        </Page>
      </ApplicationFrame>
    </>
  );
};

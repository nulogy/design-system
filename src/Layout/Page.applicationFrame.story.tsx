import React from "react";
import { Link } from "../Link";
import { ApplicationFrame, Navigation, Page, Breadcrumbs, Heading2, Text } from "..";

export default {
  title: "Components/Page/Within an ApplicationFrame",
  parameters: {
    layout: "fullscreen",
  },
};

export const NoPageTitle = () => (
  <ApplicationFrame navBar={<Navigation />}>
    <Page
      breadcrumbs={
        <Breadcrumbs>
          <Link href="/">Home</Link>
          <Link href="/">Materials</Link>
        </Breadcrumbs>
      }
    >
      <Text fontFamily="mono" fontSize="small">
        content
      </Text>
    </Page>
  </ApplicationFrame>
);

export const NoBreadcrumbs = () => (
  <ApplicationFrame navBar={<Navigation />} height="100vh">
    <Page title="Materials Overview">
      <>
        <Heading2>Overview</Heading2>
        <Text>I am main content.</Text>
      </>
    </Page>
  </ApplicationFrame>
);

export const WithFullHeight = () => (
  <ApplicationFrame navBar={<Navigation />}>
    <Page
      title="Materials Overview"
      fullHeight
      breadcrumbs={
        <Breadcrumbs>
          <Link href="/">Home</Link>
          <Link href="/">Materials</Link>
        </Breadcrumbs>
      }
    >
      <Text>I am main content.</Text>
    </Page>
  </ApplicationFrame>
);

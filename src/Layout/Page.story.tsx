import React from "react";
import { ApplicationFrame, Breadcrumbs, Link, Heading2, Text, Page, StatusIndicator, Navigation } from "..";

export default {
  title: "Components/Page",
  parameters: {
    layout: "fullscreen",
  },
};

export const _Page = () => (
  <Page
    breadcrumbs={
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/">Materials</Link>
      </Breadcrumbs>
    }
    title="Materials Overview"
    headerContent={<StatusIndicator type="informative">Beta</StatusIndicator>}
  >
    <>
      <Text fontFamily="mono" fontSize="small">
        content
      </Text>
    </>
  </Page>
);

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

export const NoBackground = () => (
  <Page
    breadcrumbs={
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/">Materials</Link>
      </Breadcrumbs>
    }
    title="Materials Overview"
  />
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

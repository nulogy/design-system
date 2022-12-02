import React from "react";
import { Box, Breadcrumbs, Button, DropdownButton, DropdownLink, Flex, Link, PrimaryButton, StatusIndicator } from "..";
import Summary from "../Summary/Summary";
import SummaryItem from "../Summary/SummaryItem";
import SummaryDivider from "../Summary/SummaryDivider";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import Header from "./Header";

export const DefaultBackground = () => (
  <Header
    renderBreadcrumbs={() => (
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/">Materials</Link>
      </Breadcrumbs>
    )}
    title="Materials Overview"
  />
);

export const WithAnUndecoratedBackground = () => (
  <Header
    undecorated
    renderBreadcrumbs={() => (
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/">Materials</Link>
      </Breadcrumbs>
    )}
    title="Materials Overview"
  />
);

export const WithActions = () => (
  <Header
    undecorated
    renderBreadcrumbs={() => (
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/">Materials</Link>
      </Breadcrumbs>
    )}
    title="Materials Overview"
    renderActions={() => (
      <Flex gap="x1">
        <PrimaryButton size="small"> Archive</PrimaryButton>
        <Button size="small">Delete</Button>
        <DropdownMenu showArrow={false} defaultOpen={false}>
          <DropdownLink href="/">Dropdown Link</DropdownLink>
          <DropdownButton>Dropdown Button</DropdownButton>
        </DropdownMenu>
      </Flex>
    )}
  />
);

export const WithCustomBackground = () => (
  <Header
    renderBreadcrumbs={() => (
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/">Materials</Link>
      </Breadcrumbs>
    )}
    title="Materials Overview"
    background="#98FB98"
    undecorated
  />
);

export const WithSubTitle = () => (
  <Header
    renderBreadcrumbs={() => (
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/">Materials</Link>
      </Breadcrumbs>
    )}
    title="Materials Overview"
    subtitle="Materials Overview"
  />
);

export const WithContent = () => (
  <Header
    renderBreadcrumbs={() => (
      <Breadcrumbs>
        <Link href="/">Home</Link>
        <Link href="/">Materials</Link>
      </Breadcrumbs>
    )}
    title="Materials Overview"
    subtitle="Materials Overview"
  >
    <Box border="1px dashed" borderColor="grey" py="half" px="x1" borderRadius="small">
      Extra content
    </Box>
  </Header>
);

export const WithSummary = () => (
  <Header
    breakpoints={{
      medium: 1200,
    }}
    renderBreadcrumbs={() => (
      <Breadcrumbs>
        <Link underline={false} href="/">
          Home
        </Link>
        <Link underline={false} href="/">
          Materials
        </Link>
      </Breadcrumbs>
    )}
    title="Page title"
    renderSummary={() => (
      <Summary breakpoint={1200}>
        <SummaryItem value={42} status={<StatusIndicator type="informative">On Time</StatusIndicator>} />
        <SummaryItem value={42} status={<StatusIndicator type="informative">On Time</StatusIndicator>} />
        <SummaryItem value={42} status={<StatusIndicator type="informative">On Time</StatusIndicator>} />
      </Summary>
    )}
  />
);

export const WithEverything = () => (
  <Header
    breakpoints={{
      small: 768,
      medium: 1200,
    }}
    renderBreadcrumbs={() => (
      <Breadcrumbs>
        <Link underline={false} href="/">
          Home
        </Link>
        <Link underline={false} href="/">
          Materials
        </Link>
      </Breadcrumbs>
    )}
    title="Page title"
    subtitle="Alternative page title"
    renderSummary={() => (
      <Summary breakpoint={1200}>
        <SummaryItem value={42} status={<StatusIndicator type="informative">On Time</StatusIndicator>} />
        <SummaryItem value={42} status={<StatusIndicator type="informative">On Time</StatusIndicator>} />
        <SummaryItem value={42} status={<StatusIndicator type="informative">On Time</StatusIndicator>} />

        <SummaryDivider />

        <SummaryItem value={42} status={<StatusIndicator type="informative">On Time</StatusIndicator>} />
        <SummaryItem value={42} status={<StatusIndicator type="informative">On Time</StatusIndicator>} />
        <SummaryItem value={42} status={<StatusIndicator type="informative">On Time</StatusIndicator>} />
      </Summary>
    )}
    renderActions={() => (
      <DropdownMenu showArrow={false} defaultOpen={false}>
        <DropdownLink href="/">Dropdown Link</DropdownLink>
        <DropdownButton>Dropdown Button</DropdownButton>
      </DropdownMenu>
    )}
  >
    <Box border="1px dashed" borderColor="grey" py="half" px="x1" borderRadius="small">
      Extra content
    </Box>
  </Header>
);

export default {
  title: "Components/Header",
  parameters: {
    layout: "fullscreen",
  },
};

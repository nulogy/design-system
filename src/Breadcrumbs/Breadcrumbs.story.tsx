import React from "react";
import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom";
import { Link } from "../Link";
import { Text } from "../Type";
import { Breadcrumbs } from "./index";
import { Flex } from "../Flex";

export default {
  title: "Components/Breadcrumbs",
};

export const _Breadcrumbs = () => (
  <>
    <Breadcrumbs>
      <Link href="/">Home</Link>
    </Breadcrumbs>
    <Breadcrumbs>
      <Link href="/">Home</Link>
      <Link href="/Tenants">Tenants</Link>
    </Breadcrumbs>
  </>
);

export const WithDifferentSizes = () => (
  <Flex alignItems="flex-start">
    <Breadcrumbs>
      <Link href="/">Default</Link>
      <Link href="/">Size</Link>
    </Breadcrumbs>
    <Breadcrumbs size="medium">
      <Link href="/">Medium</Link>
      <Link href="/">Size</Link>
    </Breadcrumbs>
    <Breadcrumbs size="large">
      <Link href="/">Large</Link>
      <Link href="/">Size</Link>
    </Breadcrumbs>
  </Flex>
);

export const WithoutLink = () => (
  <Breadcrumbs>
    <Link href="/">Home</Link>
    <Link href="/Tenants">Tenants</Link>
    <Text>Current Tenant</Text>
  </Breadcrumbs>
);

WithoutLink.story = {
  name: "without link",
};

export const WithReactRouter = () => (
  <BrowserRouter>
    <Breadcrumbs>
      <Link as={ReactRouterLink} to="/">
        Home
      </Link>
      <Link as={ReactRouterLink} to="/Tenants">
        Tenants
      </Link>
      <Text>Current Tenant</Text>
    </Breadcrumbs>
  </BrowserRouter>
);

WithReactRouter.story = {
  name: "with react router",
};

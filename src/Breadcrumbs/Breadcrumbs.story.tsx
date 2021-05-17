import React from "react";
import { BrowserRouter, Link as ReactRouterLink } from "react-router-dom";
import { Link } from "../Link";
import { Text } from "../Type";
import { Breadcrumbs } from "./index";

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

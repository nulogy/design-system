import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Breadcrumbs } from "./index";
import { Link } from "../Link";
import { Text } from "../Type";
import { ReactRouterLink } from '../Link/ReactRouterLink';

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
      <ReactRouterLink to="/">Home</ReactRouterLink>
      <ReactRouterLink to="/Tenants">Tenants</ReactRouterLink>
      <Text>Current Tenant</Text>
    </Breadcrumbs>
  </BrowserRouter>
);

WithReactRouter.story = {
  name: "with react router",
};

import React from "react";
import { Breadcrumbs } from "./index";
import { Link } from "../Link";
import { Text } from "../Type";

export default {
  title: "Components/Breadcrumbs"
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
  name: "without link"
};

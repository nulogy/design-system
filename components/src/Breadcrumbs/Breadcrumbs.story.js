import React from "react";
import { storiesOf } from "@storybook/react";
import { Breadcrumbs } from "./index";
import { Link } from "../Link";
import { Text } from "../Type";

storiesOf("Breadcrumbs", module)
  .add("Breadcrumbs", () => (
    <Breadcrumbs>
      <Link href="/">Home</Link>
      <Link href="/Tenants">Tenants</Link>
    </Breadcrumbs>
  ))
  .add("without link", () => (
    <Breadcrumbs>
      <Link href="/">Home</Link>
      <Link href="/Tenants">Tenants</Link>
      <Text>Current Tenant</Text>
    </Breadcrumbs>
  ));

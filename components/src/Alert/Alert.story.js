import React from "react";
import { storiesOf } from "@storybook/react";
import { Alert } from ".";

storiesOf("Alert", module)
  .add("Informational", () => <Alert>Hello Button</Alert>)
  .add("Danger", () => <Alert type="danger">Hello Button</Alert>)
  .add("Warning", () => <Alert type="warning">Hello Button</Alert>)
  .add("Success", () => <Alert type="success">Hello Button</Alert>);

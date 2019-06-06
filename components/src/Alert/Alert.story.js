import React from "react";
import { storiesOf } from "@storybook/react";
import { Alert } from ".";

storiesOf("Alert", module)
  .add("Danger", () => <Alert type="danger">Danger alert</Alert>)
  .add("Informational", () => <Alert>Informational alert</Alert>)
  .add("Success", () => <Alert type="success">Success alert</Alert>)
  .add("Warning", () => <Alert type="warning">Warning alert</Alert>)
  .add("With a title", () => (
    <Alert title="Danger title!" type="danger">
      Danger alert
    </Alert>
  ));

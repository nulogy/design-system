import React from "react";
import { storiesOf } from "@storybook/react";
import { Alert } from ".";

storiesOf("Alert", module)
  .add("Informational", () => <Alert>Informational alert</Alert>)
  .add("Danger", () => <Alert type="danger">Danger alert</Alert>)
  .add("Warning", () => <Alert type="warning">Warning alert</Alert>)
  .add("Success", () => <Alert type="success">Success alert</Alert>)
  .add("With a title", () => (
    <Alert title="Danger!" type="danger">
      Hello Button
    </Alert>
  ));

import React from "react";
import { storiesOf } from "@storybook/react";
import { Alert } from "../index";

storiesOf("Alert", module)
  .add("Danger", () => <Alert type="danger">Danger alert</Alert>)
  .add("Informative", () => <Alert>Informative alert</Alert>)
  .add("Success", () => <Alert type="success">Success alert</Alert>)
  .add("Warning", () => <Alert type="warning">Warning alert</Alert>)
  .add("With a close button", () => <Alert isCloseable="true">Warning alert</Alert>)
  .add("With a title", () => (
    <Alert title="Danger title!" type="danger">
      Danger alert
    </Alert>
  ));

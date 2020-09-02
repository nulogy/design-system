import React from "react";
import { storiesOf } from "@storybook/react";
import { Alert } from "../index";
import { Link } from "../Link";

storiesOf("Components/Alert", module)
  .add("Danger", () => <Alert type="danger">Danger alert</Alert>)
  .add("Informative", () => <Alert>Informative alert</Alert>)
  .add("Success", () => <Alert type="success">Success alert</Alert>)
  .add("Warning", () => <Alert type="warning">Warning alert</Alert>)
  .add("With a close button", () => <Alert isCloseable>Warning alert</Alert>)
  .add("With a title", () => (
    <Alert title="Danger title!" type="danger">
      Danger alert
    </Alert>
  ))
  .add("With a link", () => (
    <Alert>
      An alert with <Link href="/">linked details</Link>.
    </Alert>
  ));

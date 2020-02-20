import React from "react";
import { storiesOf } from "@storybook/react";
import { Trans } from "react-i18next";
import { Alert } from "../index";
import { Link } from "../Link";

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
  ))
  .add("With a link", () => (
    <Alert>
      An alert with <Link href="/">linked details</Link>.
    </Alert>
  ))
  .add("With a translation", () => (
    <Alert title="Danger title!" type="danger">
      <Trans>Welcome to React</Trans>
    </Alert>
  ));

import React from "react";
import { Alert } from "../index";
import { Link } from "../Link";

export default {
  title: "Components/Alert"
};

export const Danger = () => <Alert type="danger">Danger alert</Alert>;
export const Informative = () => <Alert>Informative alert</Alert>;
export const Success = () => <Alert type="success">Success alert</Alert>;
export const Warning = () => <Alert type="warning">Warning alert</Alert>;
export const WithACloseButton = () => <Alert isCloseable>Warning alert</Alert>;

WithACloseButton.story = {
  name: "With a close button"
};

export const WithATitle = () => (
  <Alert title="Danger title!" type="danger">
    Danger alert
  </Alert>
);

WithATitle.story = {
  name: "With a title"
};

export const WithALink = () => (
  <Alert>
    An alert with <Link href="/">linked details</Link>.
  </Alert>
);

WithALink.story = {
  name: "With a link"
};

export const WithSpaceProps = () => (
  <Alert mt="x2" p="x1">
    An alert with <Link href="/">linked details</Link>.
  </Alert>
);

WithSpaceProps.story = {
  name: "With space props"
};

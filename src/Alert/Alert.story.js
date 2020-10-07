import { boolean, text } from "@storybook/addon-knobs";
import React from "react";
import { Alert } from "../index";
import { Link } from "../Link";

export default {
  title: "Components/Alert"
};

export const Danger = () => <Alert type="danger">{text("Alert Text", "Danger alert")}</Alert>;
export const Informative = () => <Alert>{text("Alert Text", "Informative alert")}</Alert>;
export const Success = () => <Alert type="success">{text("Alert Text", "Success alert")}</Alert>;
export const Warning = () => <Alert type="warning">{text("Alert Text", "Warning alert")}</Alert>;
export const WithACloseButton = () => <Alert isCloseable={boolean("isCloseable", true)}>{text("Alert Text", "Warning alert")}</Alert>;

WithACloseButton.story = {
  name: "With a close button"
};

export const WithATitle = () => (
  <Alert title="Danger title!" type="danger">
    {text("Danger alert")}
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

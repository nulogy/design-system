import { boolean, text } from "@storybook/addon-knobs";
import React from "react";
import { Alert, Flex } from "../index";
import { Link } from "../Link";

export default {
  title: "Components/Alert",
};

const alertTypes = ["danger", "informative", "success", "warning"] as const;
export const AlertTypes = () => (
  <Flex flexDirection="column" gap="x1">
    {alertTypes.map((type) => (
      <Alert key={type} type={type} title={type}>
        This is an alert with type &quot;{type}&quot;
      </Alert>
    ))}
  </Flex>
);

export const WithACloseButton = () => (
  <Alert isCloseable={boolean("isCloseable", true)}>{text("Alert Text", "Warning alert")}</Alert>
);

WithACloseButton.story = {
  name: "With a close button",
};

export const WithATitle = () => (
  <Alert title="Danger title!" type="danger">
    {text("Alert Text", "Danger alert")}
  </Alert>
);

WithATitle.story = {
  name: "With a title",
};

export const WithALink = () => (
  <Alert>
    An alert with <Link href="/">linked details</Link>.
  </Alert>
);

WithALink.story = {
  name: "With a link",
};

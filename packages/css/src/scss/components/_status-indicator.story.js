import { storiesOf } from "@storybook/html";

storiesOf("Components/StatusIndicator", module).add(
  "StatusIndicator",
  () => `
  <p class="StatusIndicator--neutral">
    neutral
  </p>
  <p class="StatusIndicator--quiet">
    quiet
  </p>
  <p class="StatusIndicator--informative">
    informative
  </p>
  <p class="StatusIndicator--success">
    success
  </p>
  <p class="StatusIndicator--warning">
    warning
  </p>
  <p class="StatusIndicator--danger">
    danger
  </p>
`
);

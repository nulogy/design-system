/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Utilities/Borders", module).add(
  "Radius",
  () => `
    <p class="nds-rounded-corners nds-margin--x2 nds-padding--x2 nds-background--light-grey">.rounded-corners</p>
    <p class="nds-rounded-corners--small nds-margin--x2 nds-padding--x1 nds-background--light-grey nds-font-size--small">.rounded-corners--small</p>
  `
);

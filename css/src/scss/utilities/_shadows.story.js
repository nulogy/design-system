/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Utilities|Shadows", module).add(
  "All",
  () => `
    <p class="nds-rounded-corners nds-margin--x2 nds-padding--x2 nds-background--white nds-shadow">.nds-shadow</p>
  `
);

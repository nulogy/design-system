/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Utilities/Shadows", module).add(
  "All",
  () => `
    <p class="nds-rounded-corners nds-margin--x2 nds-padding--x2 nds-background--white nds-shadow--small">.nds-shadow--small</p>
    <p class="nds-rounded-corners nds-margin--x2 nds-padding--x2 nds-background--white nds-shadow--medium">.nds-shadow--medium</p>
    <p class="nds-rounded-corners nds-margin--x2 nds-padding--x2 nds-background--white nds-shadow--large">.nds-shadow--large</p>
    <p class="nds-rounded-corners nds-margin--x2 nds-padding--x2 nds-background--white nds-shadow--focus">.nds-shadow--focus</p>
  `
);

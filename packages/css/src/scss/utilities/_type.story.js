/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Utilities/Type", module)
  .add(
    "Font size",
    () => `
    <p class="nds-font-size--smaller">.nds-font-size--smaller</p>
    <p class="nds-font-size--small">.nds-font-size--small</p>
    <p class="nds-font-size--medium">.nds-font-size--medium</p>
    <p class="nds-font-size--large">.nds-font-size--large</p>
    <p class="nds-font-size--larger">.nds-font-size--larger</p>
    <p class="nds-font-size--largest">.nds-font-size--largest</p>
  `
  )
  .add(
    "Font family",
    () => `
    <p class="nds-text--base">.nds-text--base</p>
    <p class="nds-text--monospace">.nds-text--monospace</p>
  `
  )
  .add(
    "Font weight",
    () => `
    <p class="nds-font-weight--normal">.nds-font-weight--normal</p>
    <p class="nds-font-weight--medium">.nds-font-weight--medium</p>
    <p class="nds-font-weight--bold">.nds-font-weight--bold</p>
  `
  )
  .add(
    "Text align",
    () => `
    <p class="nds-text-align--left">.nds-text-align--left</p>
    <p class="nds-text-align--center">.nds-text-align--center</p>
    <p class="nds-text-align--right">.nds-text-align--right</p>

  `
  );

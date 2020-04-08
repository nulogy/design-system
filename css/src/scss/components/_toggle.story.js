import { storiesOf } from "@storybook/html";

storiesOf("Components|Toggle", module).add(
  "Toggle",
  () => `
  <label class="Toggle">
    <input type="checkbox" class="Toggle__input">
    <span class="Toggle__slider"></span>
    <span class="Toggle__text">I am a toggle</span>
  </label>
  `
);

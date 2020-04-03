import { storiesOf } from "@storybook/html";

storiesOf("Components|Toggle", module).add(
  "Toggle",
  () => `
  <label class="Toggle">
    <input type="checkbox" class="Toggle__input">
    <div class="Toggle__slider"></div>
    <p class="Toggle__text">I am a toggle</p>
  </label>
  `
);

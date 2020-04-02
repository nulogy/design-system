import { storiesOf } from "@storybook/html";

storiesOf("Components|Radio", module)
  .add(
    "Radio",
    () => `
  <label class="Radio">
    <input name="radio-story" type="radio" class="Radio__input">
    <p class="Radio__text">I am a Radio</p>
  </label>
  <label class="Radio">
    <input name="radio-story" type="radio" checked class="Radio__input">
    <p class="Radio__text">I am a Radio</p>
  </label>
  <label class="Radio">
    <input name="radio-story" type="radio" disabled class="Radio__input">
    <p class="Radio__text">I am disabled</p>
  </label>
  <label class="Radio">
    <input name="radio-story" type="radio" checked disabled class="Radio__input">
    <p class="Radio__text">I am disabled</p>
  </label>
`
  )
  .add(
    "error",
    () => `
  <label class="Radio Radio--error">
    <input type="Radio" name="error-story" class="Radio__input">
    <p class="Radio__text">I am a Radio</p>
  </label>
  <label class="Radio Radio--error">
    <input type="Radio" name="error-story" checked class="Radio__input">
    <p class="Radio__text">I am a Radio</p>
  </label>
`
  );

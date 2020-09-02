import { storiesOf } from "@storybook/html";

storiesOf("Components/Radio", module)
  .add(
    "Radio",
    () => `
  <label class="Radio">
    <input name="radio-story" type="radio" class="Radio__input">
    <span class="Radio__text">I am a Radio</span>
  </label>
  <label class="Radio">
    <input name="radio-story" type="radio" checked class="Radio__input">
    <span class="Radio__text">I am a Radio</span>
  </label>
  <label class="Radio">
    <input name="radio-story" type="radio" disabled class="Radio__input">
    <span class="Radio__text">I am disabled</span>
  </label>
  <label class="Radio">
    <input name="radio-story" type="radio" checked disabled class="Radio__input">
    <span class="Radio__text">I am disabled</span>
  </label>
`
  )
  .add(
    "error",
    () => `
  <label class="Radio Radio--error">
    <input type="Radio" name="error-story" class="Radio__input">
    <span class="Radio__text">I am a Radio</span>
  </label>
  <label class="Radio Radio--error">
    <input type="Radio" name="error-story" checked class="Radio__input">
    <span class="Radio__text">I am a Radio</span>
  </label>
`
  );

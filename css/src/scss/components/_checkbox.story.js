import { storiesOf } from "@storybook/html";

storiesOf("Components|Checkbox", module)
  .add(
    "Checkbox",
    () => `

  <fieldset>
    <legend class="Label"> I'm a label for the checkboxes</legend>
    <label class="Checkbox">
      <input type="checkbox" class="Checkbox__input">
      <p class="Checkbox__text">I am a checkbox</p>
    </label>
    <label class="Checkbox">
      <input type="checkbox" checked class="Checkbox__input">
      <p class="Checkbox__text">I am a checkbox</p>
    </label>
    <label class="Checkbox">
      <input type="checkbox" disabled class="Checkbox__input">
      <p class="Checkbox__text">I am disabled</p>
    </label>
    <label class="Checkbox">
      <input type="checkbox" checked disabled class="Checkbox__input">
      <p class="Checkbox__text">I am disabled</p>
    </label>
  </fieldset>

`
  )
  .add(
    "error",
    () => `
  <label class="Checkbox Checkbox--error">
    <input type="checkbox" class="Checkbox__input">
    <p class="Checkbox__text">I am a checkbox</p>
  </label>
  <label class="Checkbox Checkbox--error">
    <input type="checkbox" checked class="Checkbox__input">
    <p class="Checkbox__text">I am a checkbox</p>
  </label>
`
  );

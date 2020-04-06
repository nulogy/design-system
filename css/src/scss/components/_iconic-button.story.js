/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Components|Iconic Button", module).add(
  "Iconic Button",
  () => `
    <button class="IconicButton">
      <i class="material-icons">delete</i>
    </button>
    <br/>
    <button class="IconicButton">
      <i class="material-icons">delete</i>
      <p class="IconicButton__text">Delete</p>
    </button>
`
);

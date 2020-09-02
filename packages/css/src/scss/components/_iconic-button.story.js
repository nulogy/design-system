/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Components/IconicButton", module).add(
  "IconicButton",
  () => `
    <button class="IconicButton">
      <i class="IconicButton__icon material-icons">delete</i>
    </button>
    <br/>
    <button class="IconicButton">
      <i class="IconicButton__icon material-icons">delete</i>
      <p class="IconicButton__text">Delete</p>
    </button>
`
);

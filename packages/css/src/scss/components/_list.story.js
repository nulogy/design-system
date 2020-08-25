/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Components/List", module).add(
  "List",
  () => `
    <ul class="List">
      <li class="List__item">Hi</li>
      <li class="List__item">Hi</li>
    </ul>
    <ul class="List">
      <li class="List__item">Hi</li>
      <li class="List__item">Hi</li>
    </ul>
`
);

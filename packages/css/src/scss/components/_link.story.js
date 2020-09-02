/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Components/Link", module).add(
  "Link",
  () => `
    <a href="javascript::" class="Link">Link</a>
`
);

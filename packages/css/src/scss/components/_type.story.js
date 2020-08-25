/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Components/Type", module).add(
  "Headings",
  () => `
    <h1 class="Heading1">.Heading1</h1>
    <h2 class="Heading2">.Heading2</h2>
    <h3 class="Heading3">.Heading3</h3>
    <h4 class="Heading4">.Heading4</h3>
`
);

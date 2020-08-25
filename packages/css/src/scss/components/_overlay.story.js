/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Components/Overlay", module)
  .add(
    "Overlay",
    () => `
    <p>Some content behind the overlay</p>
    <div class="Overlay">
    </div>
`
  )
  .add(
    "Light Overlay",
    () => `
    <p>Some content behind the overlay</p>
    <div class="Overlay Overlay--light">
    </div>
`
  );

/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Components/Buttons", module).add(
  "All Buttons",
  () => `
    <div style="padding: 24px">
        <p style="font-size: 24px; margin-bottom: 1rem;"> Filled-in Buttons with shadow on hover </p>
        <h1 class="SubsectionTitle" style="margin-bottom: 1rem;">Base</h1>
        <button class="QuietButton">Quiet</button>
        <button class="Button">Button</button>
        <button class="PrimaryButton">Primary</button>
        <button class="DangerButton">Danger</button>
    </div>

    <div style="padding: 24px">
    <h1 class="SubsectionTitle" style="margin-bottom: 1rem;">Disabled</h1>
        <button class="QuietButton" disabled>Quiet</button>
        <button class="Button" disabled>Button</button>
        <button class="PrimaryButton" disabled>Primary</button>
        <button class="DangerButton" disabled>Danger</button>
    </div>

    <div style="padding: 24px">
    <h1 class="SubsectionTitle" style="margin-bottom: 1rem;">Sizes</h1>
        <button class="Button Button--small">Small</button>
        <button class="Button">Default</button>
        <button class="Button Button--large">Large</button>
    </div>
`
);

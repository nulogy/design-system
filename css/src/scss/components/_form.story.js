/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Components|Form", module)
  .add(
    "Form",
    () => `
    <form class="Form">
      <label class="Label"> Input
        <input class="Input" />
      </label>

      <label class="Label"> Textarea
        <textarea class="Textarea"></textarea>
      </label>

      <div>
        <button class="PrimaryButton">Create project</button>
        <button class="QuietButton">Cancel</button>
      </div>
    </form>
`
  )
  .add(
    "Variations",
    () => `
    <form class="Form">
      <label class="Label"> Disabled
        <input class="Input" disabled />
      </label>
      <label class="Label"> Error
        <input class="Input Input--error" />
      </label>
    </form>
`
  );

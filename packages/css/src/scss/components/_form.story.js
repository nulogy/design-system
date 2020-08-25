/* global document */
import { storiesOf } from "@storybook/html";

storiesOf("Components/Form", module)
  .add(
    "Form",
    () => `
    <form class="Form">
      <label class="Label"> Input<span class="Label__requirement-text">Required</span>
        <p class="Label__help-text">Additional helpful text</p>
        <input class="Input" />
      </label>

      <label class="Label"> Textarea
        <textarea class="Textarea"></textarea>
      </label>

      <label class="Label"> Select
        <select class="Select">
            <option value="planned">Planned</option>
            <option value="booked">Booked</option>
        </select>
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
  )
  .add(
    "with sections",
    () => `
    <form class="Form">
      <h2 class="Form__heading">Your Feedback</h2>
      <fieldset class="Form__section">
        <legend class="Form__section-heading">Contact Info</legend>
        <label class="Label"> Name
          <input class="Input" />
        </label>
        <label class="Label"> Phone number
          <input class="Input" />
        </label>
      </fieldset>
      <fieldset class="Form__section">
        <legend class="Form__section-heading">Message</legend>
        <label class="Label"> Subject
          <input class="Input" />
        </label>

        <label class="Label"> Comment
          <textarea class="Textarea"></textarea>
        </label>

        <div>
      </fieldset>
        <button class="PrimaryButton">Create project</button>
        <button class="QuietButton">Cancel</button>
      </div>
    </form>
`
  );

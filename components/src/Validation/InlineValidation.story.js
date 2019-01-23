import React from "react";
import { storiesOf } from "@storybook/react";
import InlineValidation from "./InlineValidation";

storiesOf("Inline Validation", module)
  .add("Inline Validation", () => (
    <InlineValidation message="Something has gone wrong">
      <li>Something has gone wrong.</li>
      <li>Entry must be atleast 3 characters long</li>
      <li><a href="">See here</a></li>
    </InlineValidation>
  ))
  .add("With custom style", () => (
    <InlineValidation color="green" icon="check" message="Good job.">
      <li>Everything is as expected</li>
      <li><a href="#">Learn more</a></li>
    </InlineValidation>
  ))
  .add("Without list items", () => (
    <InlineValidation message="Something has gone wrong" />
  ));

import React from "react";
import { storiesOf } from "@storybook/react";
import InlineValidation from "./InlineValidation";

storiesOf("Inline Validation", module)
  .add("Inline Validation", () => (
    <InlineValidation message="Something has gone wrong">
      <ul style={ { margin: 0, WebkitFontSmoothing: "antialiased" } }>
        <li>Something has gone wrong.</li>
        <li>Entry must be atleast 3 characters long</li>
        <li><a href="https://nulogy.design/">See here</a></li>
      </ul>
    </InlineValidation>
  ))
  .add("With custom style", () => (
    <InlineValidation color="green" icon={ { name: "check", color: "blue" } } message="Good job.">
      <ul style={ { margin: 0, WebkitFontSmoothing: "antialiased" } }>
        <li>Everything is as expected</li>
        <li><a href="https://nulogy.design/">Learn more</a></li>
      </ul>
    </InlineValidation>
  ))
  .add("Without list items", () => (
    <InlineValidation message="Something has gone wrong" />
  ));

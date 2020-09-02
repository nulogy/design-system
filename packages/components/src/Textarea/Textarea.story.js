import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Textarea, Form, PrimaryButton, Button } from "../index";

const errorList = ["Error message 1", "Error message 2"];

storiesOf("Components/Textarea", module)
  .add("Textarea", () => <Textarea labelText="Label" onChange={action("value changed")} onBlur={action("blurred")} />)
  .add("Textarea with all props", () => (
    <Textarea
      labelText="Label"
      placeholder="Placeholder"
      helpText="here's some help..."
      requirementText="(Required)"
      required
      onChange={action("value changed")}
      onBlur={action("blurred")}
    />
  ))
  .add("Set to disabled", () => <Textarea labelText="Label" disabled />)
  .add("with error message", () => (
    <Textarea
      labelText="Label"
      errorMessage="Please fill this out"
      onChange={action("value changed")}
      onBlur={action("blurred")}
    />
  ))
  .add("with error list", () => (
    <Textarea
      labelText="Label"
      errorMessage="Please fill this out"
      errorList={errorList}
      onChange={action("value changed")}
    />
  ))
  .add("With custom number of rows", () => (
    <Textarea labelText="Label" rows={7} onChange={action("value changed")} onBlur={action("blurred")} />
  ))
  .add("With custom id", () => (
    <Textarea id="my-custom-id" labelText="Label" onChange={action("value changed")} onBlur={action("blurred")} />
  ))
  .add("using ref to control focus", () => {
    const ref = useRef(null);
    const handleClick = () => {
      ref.current.focus();
    };

    return (
      <>
        <Textarea ref={ref} labelText="Label" rows={7} onChange={action("value changed")} onBlur={action("blurred")} />
        <Button onClick={handleClick}>Focus the Input</Button>
      </>
    );
  });

import React, { useRef } from "react";
import { action } from "@storybook/addon-actions";
import { Textarea, Button } from "../index";
import { Flex } from "../Flex";

const errorList = ["Error message 1", "Error message 2"];

export default {
  title: "Components/Textarea",
};

export const _Textarea = () => (
  <Textarea labelText="Label" onChange={action("value changed")} onBlur={action("blurred")} />
);

export const TextareaWithAllProps = () => (
  <Textarea
    labelText="Label"
    placeholder="Placeholder"
    helpText="here's some help..."
    requirementText="(Required)"
    required
    onChange={action("value changed")}
    onBlur={action("blurred")}
  />
);

export const SetToDisabled = () => <Textarea labelText="Label" disabled value="Disabled" />;

export const WithNoResizing = () => (
  <Textarea labelText="Label" value="I shouldn't be able to be resized" isResizeable={false} />
);

export const WithErrorMessage = () => (
  <Textarea
    labelText="Label"
    errorMessage="Please fill this out"
    onChange={action("value changed")}
    onBlur={action("blurred")}
  />
);

export const WithErrorList = () => (
  <Textarea
    labelText="Label"
    errorMessage="Please fill this out"
    errorList={errorList}
    onChange={action("value changed")}
  />
);

export const WithCustomNumberOfRows = () => (
  <Textarea labelText="Label" rows={7} onChange={action("value changed")} onBlur={action("blurred")} />
);

export const WithCustomId = () => (
  <Textarea id="my-custom-id" labelText="Label" onChange={action("value changed")} onBlur={action("blurred")} />
);

export const UsingRefToControlFocus = () => {
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
};

export const WithDifferentSizes = () => {
  return (
    <Flex gap="x2" alignItems="flex-start">
      <Textarea labelText="Default size" onChange={action("value changed")} onBlur={action("blurred")} />
      <Textarea size="medium" labelText="Medium size" onChange={action("value changed")} onBlur={action("blurred")} />
      <Textarea size="large" labelText="Large size" onChange={action("value changed")} onBlur={action("blurred")} />
    </Flex>
  );
};

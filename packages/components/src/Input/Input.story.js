import React, { useRef } from "react";
import { action } from "@storybook/addon-actions";
import { Input, Form, FormSection, PrimaryButton, Button } from "../index";

const errorList = ["Error message 1", "Error message 2"];

export default {
  title: "Components/Input"
};

export const _Input = () => <Input labelText="Input" onChange={action("value changed")} onBlur={action("blurred")} />;

export const WithAllProps = () => (
  <Input
    placeholder="Placeholder"
    labelText="Input"
    helpText="Additional help text"
    requirementText="Required"
    onChange={action("value changed")}
    onBlur={action("blurred")}
    required
  />
);

WithAllProps.story = {
  name: "with all props"
};

export const SetToDisabled = () => <Input labelText="Set to disabled" disabled onBlur={action("blurred")} />;

SetToDisabled.story = {
  name: "set to disabled"
};

export const WithErrorMessage = () => (
  <Input labelText="Label" errorMessage="Error message" onChange={action("value changed")} onBlur={action("blurred")} />
);

WithErrorMessage.story = {
  name: "with error message"
};

export const WithErrorList = () => (
  <Input
    labelText="Label"
    errorMessage="Error message"
    errorList={errorList}
    onChange={action("value changed")}
    onBlur={action("blurred")}
  />
);

WithErrorList.story = {
  name: "with error list "
};

export const WithCustomId = () => (
  <Input id="my-own-id" labelText="Label" onChange={action("value changed")} onBlur={action("blurred")} />
);

WithCustomId.story = {
  name: "with custom ID"
};

export const SetToRequired = () => (
  <>
    <Form title="Required field example">
      <Input required labelText="Label" onChange={action("value changed")} onBlur={action("blurred")} />
      <PrimaryButton>Send</PrimaryButton>
    </Form>
  </>
);

SetToRequired.story = {
  name: "set to required"
};

export const WithAAffixPrefixAndSuffix = () => (
  <>
    <Form title="Suffix" mb="x6">
      <FormSection>
        <Input suffix="Eaches" />
        <Input suffix="Pallets and boxes" />
      </FormSection>
      <FormSection title="With Custom Width">
        <Input suffix="Eaches" suffixWidth="360px" prefixAlignment="right" />
        <Input suffix="Pallets and boxes" suffixWidth="360px" />
      </FormSection>
    </Form>
    <Form title="Prefix" mb="x6">
      <FormSection>
        <Input prefix="Eaches" />
        <Input prefix="Pallets and boxes" />
      </FormSection>
      <FormSection title="With Custom Width">
        <Input prefix="Eaches" prefixWidth="360px" />
        <Input prefix="Pallets and boxes" prefixWidth="360px" />
      </FormSection>
      <FormSection title="With right alignment">
        <Input prefix="Eaches" prefixWidth="360px" prefixAlignment="right" />
        <Input prefix="Pallets and boxes" prefixWidth="360px" prefixAlignment="right" />
      </FormSection>
    </Form>
    <Form title="Prefix and Suffix" mb="x6">
      <Input prefix="Quantity" suffix="Eaches" />
    </Form>
  </>
);

WithAAffixPrefixAndSuffix.story = {
  name: "with a affix (prefix and suffix)"
};

export const UsingRefToControlFocus = () => {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current.focus();
  };

  return (
    <>
      <Input id="my-own-id" ref={ref} labelText="Label" onChange={action("value changed")} onBlur={action("blurred")} />
      <Button onClick={handleClick}>Focus the Input</Button>
    </>
  );
};

UsingRefToControlFocus.story = {
  name: "using ref to control focus"
};

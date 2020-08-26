import React, { useRef } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Input, Form, FormSection, PrimaryButton, Button } from "../index";

const errorList = ["Error message 1", "Error message 2"];

storiesOf("Components/Input", module)
  .add("Input", () => <Input labelText="Input" onChange={action("value changed")} onBlur={action("blurred")} />)
  .add("with all props", () => (
    <Input
      placeholder="Placeholder"
      labelText="Input"
      helpText="Additional help text"
      requirementText="Required"
      onChange={action("value changed")}
      onBlur={action("blurred")}
      required
    />
  ))
  .add("set to disabled", () => <Input labelText="Set to disabled" disabled onBlur={action("blurred")} />)
  .add("with error message", () => (
    <Input
      labelText="Label"
      errorMessage="Error message"
      onChange={action("value changed")}
      onBlur={action("blurred")}
    />
  ))
  .add("with error list ", () => (
    <Input
      labelText="Label"
      errorMessage="Error message"
      errorList={errorList}
      onChange={action("value changed")}
      onBlur={action("blurred")}
    />
  ))
  .add("with custom ID", () => (
    <Input id="my-own-id" labelText="Label" onChange={action("value changed")} onBlur={action("blurred")} />
  ))
  .add("set to required", () => (
    <>
      <Form title="Required field example">
        <Input required labelText="Label" onChange={action("value changed")} onBlur={action("blurred")} />
        <PrimaryButton>Send</PrimaryButton>
      </Form>
    </>
  ))
  .add("with a affix (prefix and suffix)", () => (
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
  ))
  .add("using ref to control focus", () => {
    const ref = useRef(null);
    const handleClick = () => {
      ref.current.focus();
    };

    return (
      <>
        <Input
          id="my-own-id"
          ref={ref}
          labelText="Label"
          onChange={action("value changed")}
          onBlur={action("blurred")}
        />
        <Button onClick={handleClick}>Focus the Input</Button>
      </>
    );
  });

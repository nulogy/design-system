import React, { useRef } from "react";
import { action } from "@storybook/addon-actions";
import { Input, Form, FormSection, PrimaryButton, Button, Flex, Heading1, Heading4 } from "../index";

const errorList = ["Error message 1", "Error message 2"];

export default {
  title: "Components/Input",
};

export const _Input = () => <Input labelText="Input" onChange={action("value changed")} onBlur={action("blurred")} />;

export const WithAllProps = () => (
  <Input
    placeholder="Placeholder"
    p="x3"
    labelText="Input"
    helpText="Additional help text"
    requirementText="Required"
    onChange={action("value changed")}
    onBlur={action("blurred")}
    required
  />
);

WithAllProps.story = {
  name: "with all props",
};

export const SetToDisabled = () => (
  <Input labelText="Set to disabled" disabled onBlur={action("blurred")} value="Disabled" />
);

SetToDisabled.story = {
  name: "set to disabled",
};

export const WithErrorMessage = () => (
  <Input labelText="Label" errorMessage="Error message" onChange={action("value changed")} onBlur={action("blurred")} />
);

WithErrorMessage.story = {
  name: "with error message",
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
  name: "with error list ",
};

export const WithCustomId = () => (
  <Input id="my-own-id" labelText="Label" onChange={action("value changed")} onBlur={action("blurred")} />
);

WithCustomId.story = {
  name: "with custom ID",
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
  name: "set to required",
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
  name: "with a affix (prefix and suffix)",
};

export const WithAnIcon = () => (
  <Flex flexDirection="column" gap="x2">
    <Input maxWidth="320px" inputWidth="320px" iconLeft="search" placeholder="Search by SKU" labelText="Left Icon" />
    <Input maxWidth="320px" inputWidth="320px" iconRight="barcode" placeholder="Search by SKU" labelText="Right Icon" />
    <Input
      maxWidth="320px"
      inputWidth="320px"
      iconRight="barcode"
      iconLeft="search"
      placeholder="Search by SKU"
      labelText="Left and right icons"
    />
    <Input
      maxWidth="320px"
      inputWidth="320px"
      iconLeft="search"
      iconLeftSize="x2"
      placeholder="Search by SKU"
      labelText="Custom icon size"
    />
  </Flex>
);

export const WithIconTooltips = () => (
  <Flex flexDirection="column" gap="x2">
    <Heading4>
      You can use tooltips to provide additional information about the icon. Tooltips can be customized with the same
      props as the Tooltip component.
    </Heading4>
    <Input
      maxWidth="320px"
      inputWidth="320px"
      iconLeft="search"
      iconLeftTooltip="Search products"
      iconLeftTooltipProps={{
        placement: "right",
        showDelay: "500",
      }}
      placeholder="Search by SKU"
      labelText="Hover over the search icon (right placement, 500ms delay)"
    />
    <Input
      maxWidth="320px"
      inputWidth="320px"
      iconRight="barcode"
      iconRightTooltip="Scan barcode"
      iconRightTooltipProps={{
        placement: "left",
        hideDelay: "1000",
      }}
      placeholder="Scan product"
      labelText="Hover over the barcode icon (left placement, 1s hide delay)"
    />
    <Input
      maxWidth="320px"
      inputWidth="320px"
      iconLeft="search"
      iconRight="close"
      iconLeftTooltip="Search products"
      iconRightTooltip="Clear search"
      iconLeftTooltipProps={{
        placement: "top",
        maxWidth: "150px",
      }}
      iconRightTooltipProps={{
        placement: "bottom",
        maxWidth: "150px",
      }}
      placeholder="Search with both tooltips"
      labelText="Different placements (top and bottom)"
    />
  </Flex>
);

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
  name: "using ref to control focus",
};

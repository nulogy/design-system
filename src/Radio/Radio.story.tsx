import { Meta, StoryObj } from "@storybook/react";
import React, { useRef } from "react";
import { action } from "@storybook/addon-actions";
import { Radio, Button } from "../index";

export default {
  title: "Components/Radio",
  component: Radio,
  args: {
    p: "x3",
    id: "radio",
    labelText: "I am a radio button",
  },
  render: (args) => <Radio {...args} data-testid="radio" />,
} satisfies Meta<typeof Radio>;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    labelText: "I am a radio button",
  },
};

export const SetToDefaultChecked: Story = {
  args: {
    defaultChecked: true,
    labelText: "I am checked by default",
  },
  name: "Set to default checked",
};

export const SetToDisabled: Story = {
  render: (args) => (
    <>
      <Radio {...args} id="radio-1" disabled labelText="I am disabled" />
      <Radio {...args} id="radio-2" checked disabled labelText="I am disabled" />
    </>
  ),
  name: "Set to disabled",
};

export const SetToError: Story = {
  render: (args) => (
    <>
      <Radio {...args} id="radio" error labelText="I am error" />
      <Radio {...args} id="radio" defaultChecked error labelText="I am error" />
    </>
  ),
  name: "Set to error",
};

export const SetToRequired: Story = {
  render: (args) => (
    <>
      <Radio {...args} id="radio" labelText="I am a radio button" required />
    </>
  ),
  name: "Set to required",
};

export const Controlled: Story = {
  render: (args) => (
    <>
      <Radio {...args} id="radio-1" checked onChange={action("onChange")} labelText="I am controlled and checked" />
      <Radio
        {...args}
        id="radio-2"
        checked={false}
        onChange={action("onChange")}
        labelText="I am controlled and unchecked"
      />
    </>
  ),
};

const UsingRefToControlFocusComponent = () => {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current.focus();
  };

  return (
    <>
      <Radio ref={ref} checked onChange={action("onChange")} labelText="I am controlled and checked" />
      <Button onClick={handleClick} data-testid="the-button">
        Focus the Input
      </Button>
    </>
  );
};

export const UsingRefToControlFocus: Story = {
  render: (args) => <UsingRefToControlFocusComponent {...args} />,
  name: "using ref to control focus",
};

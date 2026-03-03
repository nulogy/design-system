import { Meta, StoryObj } from "@storybook/react-vite";
import React, { useRef } from "react";
import { expect, userEvent, within } from "storybook/test";
import { action } from "storybook/actions";
import { Radio, Button } from "../index";

export default {
  title: "Components/Radio",
  component: Radio,
  args: {
    id: "radio",
    labelText: "I am a radio button",
  },
} satisfies Meta<typeof Radio>;

type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: {
    labelText: "I am a radio button",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("can be checked", async () => {
      const radio = canvas.getByRole("radio");
      await expect(radio).not.toBeChecked();
      await userEvent.click(radio);
      await expect(radio).toBeChecked();
    });
  },
};

export const SetToDefaultChecked: Story = {
  args: {
    defaultChecked: true,
    labelText: "I am checked by default",
  },
  name: "Set to default checked",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("radio")).toBeChecked();
  },
};

export const SetToDisabled: Story = {
  render: (args) => (
    <>
      <Radio {...args} id="radio-1" disabled labelText="I am disabled" />
      <Radio {...args} id="radio-2" checked disabled labelText="I am disabled" />
    </>
  ),
  name: "Set to disabled",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("shows checked value", async () => {
      const radios = canvas.getAllByRole("radio");
      await expect(radios[0]).not.toBeChecked();
      await expect(radios[1]).toBeChecked();
    });
    await step("inputs are disabled", async () => {
      const radios = canvas.getAllByRole("radio");
      await expect(radios[0]).toBeDisabled();
      await expect(radios[1]).toBeDisabled();
    });
  },
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("shows checked value", async () => {
      const radios = canvas.getAllByRole("radio");
      await expect(radios[0]).toBeChecked();
      await expect(radios[1]).not.toBeChecked();
    });
  },
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
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("focus can be set via ref", async () => {
      const radio = canvas.getByRole("radio");
      await userEvent.click(canvas.getByTestId("the-button"));
      await expect(radio).toHaveFocus();
    });
  },
};

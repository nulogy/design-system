import type { Meta, StoryObj } from "@storybook/react-vite";
import { useRef, useState } from "react";
import { action } from "storybook/actions";
import { expect, spyOn, userEvent, waitFor, within } from "storybook/test";
import { Box, Button, Toggle } from "../index";
import { dashed } from "../utils/story/dashed";

const DashedBox = dashed(Box);

export default {
  title: "Components/Toggle",
  component: Toggle,
} satisfies Meta<typeof Toggle>;

type Story = StoryObj<typeof Toggle>;

export const _Toggle: Story = {
  render: () => {
    const [toggled, setToggled] = useState(false);
    return <Toggle data-testid="toggle-example" checked={toggled} onChange={(e) => setToggled(e.target.checked)} />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("changes the value on click", async () => {
      const input = canvasElement.querySelector("[data-testid='toggle-example'] input") as HTMLInputElement;
      await expect(input).not.toBeChecked();
      await userEvent.click(canvas.getByTestId("toggle-example"));
      await expect(input).toBeChecked();
    });
    await step("does not warn about the supported checked prop", async () => {
      await expect(console.warn).not.toHaveBeenCalledWith(expect.stringContaining("deprecated"));
    });
  },
  beforeEach: () => {
    const warn = spyOn(console, "warn");
    return () => warn.mockRestore();
  },
};

export const WithDeprecatedToggledProp: Story = {
  render: () => <Toggle toggled onChange={() => {}} />,
  name: "With deprecated toggled prop",
  play: async () => {
    // The warning fires from an effect, which may not have run yet outside the test environment (e.g. Chromatic)
    await waitFor(() => expect(console.warn).toHaveBeenCalledWith("toggled is deprecated. Use checked instead."));
  },
  beforeEach: () => {
    const warn = spyOn(console, "warn").mockImplementation(() => {});
    return () => warn.mockRestore();
  },
};

export const ToggleWithAllProps: Story = {
  render: () => {
    const [toggled, setToggled] = useState(true);

    return (
      <Toggle
        labelText="Toggle"
        helpText="Turns setting on/off"
        onText="on"
        offText="off"
        checked={toggled}
        required
        requirementText="(Required)"
        onChange={(e) => setToggled(e.target.checked)}
      />
    );
  },

  name: "Toggle with all props",
};

export const ToggleSetToDisabled: Story = {
  render: () => {
    return (
      <>
        <Toggle
          labelText="Toggle"
          disabled
          onText="on"
          offText="off"
          onChange={action("on change")}
          data-testid="toggle-example"
        />
        <Toggle
          id="toggle-2"
          disabled
          onText="on"
          offText="off"
          checked={true}
          labelText="Toggle"
          onChange={action("on change")}
        />
      </>
    );
  },

  name: "Toggle set to disabled",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("disabled toggle does not change on click", async () => {
      const input = canvas.getByTestId("toggle-example").querySelector("input") as HTMLInputElement;
      await expect(input).toBeDisabled();
      await expect(input).not.toBeChecked();
    });
  },
};

export const WithCustomId: Story = {
  render: () => {
    const [toggled, setToggled] = useState(true);

    return (
      <Toggle
        id="my-custom-id"
        labelText="Toggle"
        onText="on"
        offText="off"
        checked={toggled}
        onChange={(e) => setToggled(e.target.checked)}
      />
    );
  },

  name: "With custom id",
};

export const WithText: Story = {
  render: () => {
    const [toggled, setToggled] = useState(true);

    return (
      <Toggle
        labelText="Toggle"
        onText="on"
        offText="off"
        checked={toggled}
        onChange={(e) => setToggled(e.target.checked)}
      />
    );
  },

  name: "With text",
};

export const WithLongText: Story = {
  render: () => {
    const [toggled, setToggled] = useState(true);

    return (
      <Toggle
        labelText="Toggle"
        checked={toggled}
        onText="this state has a very long text label to explain it's state"
        offText="not this one"
        onChange={(e) => setToggled(e.target.checked)}
      />
    );
  },

  name: "With long text",
};

export const WithContraintWidth: Story = {
  render: () => {
    const [toggled, setToggled] = useState(true);

    return (
      <DashedBox width="200px" padding="x2">
        <Toggle
          labelText="Toggle"
          onText="This is a long On label for the toggle component."
          offText="This is a long Off label for the toggle component."
          checked={toggled}
          onChange={(e) => setToggled(e.target.checked)}
        />
      </DashedBox>
    );
  },

  name: "With constraint width",
};

export const UsingRefToControlFocus: Story = {
  render: () => {
    const [toggled, setToggled] = useState(true);
    const ref = useRef<HTMLInputElement>(null);
    const handleClick = () => {
      ref.current.focus();
    };

    return (
      <>
        <Toggle
          id="my-custom-id"
          labelText="Toggle"
          onText="on"
          offText="off"
          checked={toggled}
          onChange={(e) => setToggled(e.target.checked)}
          ref={ref}
        />
        <Button onClick={handleClick}>Focus the Toggle</Button>
      </>
    );
  },

  name: "Using ref to control focus",
};

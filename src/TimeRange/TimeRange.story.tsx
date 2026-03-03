import React, { useRef } from "react";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";
import { action } from "storybook/actions";

import { Button, PrimaryButton } from "..";
import TimeRange from "./TimeRange";

export default {
  title: "Components/TimeRange",
};

export const Default = {
  render: () => (
    <TimeRange
      p="x3"
      onRangeChange={action("range changed")}
      onStartTimeChange={action("start date changed")}
      onEndTimeChange={action("end date changed")}
    />
  ),

  name: "default",
};

export const DefaultSelections = {
  render: () => (
    <TimeRange
      onRangeChange={action("range changed")}
      defaultStartTime="12:00 AM"
      defaultEndTime="01:30 PM"
      onStartTimeChange={action("start date changed")}
      onEndTimeChange={action("end date changed")}
    />
  ),

  name: "default selections",
};

export const WithRangeValidation = {
  render: () => (
    <TimeRange
      onRangeChange={action("range changed")}
      defaultStartTime="12:00 AM"
      defaultEndTime="03:30 AM"
      onStartTimeChange={action("start date changed")}
      onEndTimeChange={action("end date changed")}
    />
  ),

  name: "with range validation",
};

export const WithMinAndMaxTimeRange = {
  render: () => (
    <TimeRange
      onRangeChange={action("range changed")}
      minTime="09:00"
      maxTime="18:30"
      onStartTimeChange={action("start date changed")}
      onEndTimeChange={action("end date changed")}
    />
  ),

  name: "with min and max time range",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("shows constrained end time options after selecting a start time", async () => {
      await userEvent.click(canvas.getByLabelText("Select a start time"));
      const startOptions = screen.getAllByTestId(/select-option/);
      await userEvent.click(startOptions[4]);
      const startInput = canvas.getAllByTestId("select-input")[0];
      await expect(startInput).toHaveValue("10:00 AM");
      await userEvent.click(canvas.getByLabelText("Select an end time"));
      const endOptions = screen.getAllByTestId(/select-option/);
      await expect(endOptions.length).toBeGreaterThan(0);
    });
  },
};

export const UsingRefToControlFocus = {
  render: () => {
    const ref = useRef(null);
    const handleClick = () => {
      ref.current.inputRef1.focus();
    };
    const handleClick2 = () => {
      ref.current.inputRef2.focus();
    };

    return (
      <>
        <TimeRange
          onRangeChange={action("range changed")}
          onStartTimeChange={action("start date changed")}
          onEndTimeChange={action("end date changed")}
          ref={ref}
        />
        <Button onClick={handleClick} ml="x2">
          Focus the First Input
        </Button>
        <PrimaryButton onClick={handleClick2} ml="x2">
          Focus the Second Input
        </PrimaryButton>
      </>
    );
  },

  name: "using ref to control focus",
};
